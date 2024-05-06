import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Exam } from 'src/app/models/exam.model';
import { ExamInstructionsComponent } from '../exam-instructions/exam-instructions.component';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { MassageboxComponent } from 'src/app/utils/massagebox/massagebox.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  @ViewChild(ExamInstructionsComponent) codeEditorComponent!: ExamInstructionsComponent;
  
  examCode: string | null = null;
  paper: Paper | null = null;
  currentQuestion: Question | undefined;
  QuestionNumber: Number = 0;
  questionsList: Question[] = [];
  examAttemptId: number | undefined;
  questions$: Observable<Paper> | undefined;
  Exam$: Observable<Exam> | undefined;
  examObjet: Exam | undefined;
  examDuration: string | undefined;
  questions: Paper = { id: 0, name: '', active: false, questions: [] };
  lock: boolean = false;
  LOCKED_KEYS: string[] = ["MetaLeft", "MetaRight", "KeyN", "KeyT","KeyR","Escape", "AltLeft", "AltRight","ControlLeft", "ControlRight"];
  warningcount:number=0;
  examAttempt$: Observable<any> | undefined;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private sharedDataService: SharedDataService,
    private dialog: MatDialog,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.lockkeys()
    this.examAttempt$ = this.sharedDataService.examAttempt$.pipe(
      takeUntil(this.unsubscribe$)
    );
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode');
    this.Exam$ = this.examService.getExamByCode(this.examCode as string);
    this.Exam$.subscribe(
      (response) => {
        this.examObjet = response;
        this.examDuration = response.duration;
        const newData = {
          exam_time: this.examDuration,
          examCode: this.examCode,
        };
        this.sharedDataService.updateExamTime(newData);
      },
      (error) => {}
    );

    if (this.examAttempt$ != null) {
      this.examAttempt$.subscribe((response) => {
        this.examAttemptId = response;
      });
    }
  }

  

  async lockkeys(){
    if (!this.lock) {
      await (navigator as any).keyboard.lock(this.LOCKED_KEYS);
      this.lock = true;
      console.log("locked")
      return;
    }
    (navigator as any).keyboard.unlock();
    this.lock = false;
  } catch (err:any) {
    this.lock = false;
    alert(`${err.name}: ${err.message}`);
  }
  
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (this.lock && this.LOCKED_KEYS.includes(event.code)) {
      event.preventDefault(); 
      if(this.warningcount>=1){
         this.onSubmit()
      }
      else{
        this.openSweetAlert()
      }
      this.warningcount++
      
    }
  }

  onCancel(): void {
    Swal.close();
    console.log('Cancel action triggered');
  }
  
  onSubmit(): void {
    this.sharedDataService.updateLastQuestionAndSave(true);
    this.examService.submitExam(this.examAttemptId as number).subscribe(
      (response) => {
        const dialogRef = this.dialog.open(MassageboxComponent, {
          data: {
            title: 'Completed !',
            message: 'Your answers have been submitted successfully .' + '',
            note: 'ok',
          },
        });
        this.toggleFullscreen()
        this.router.navigateByUrl('/user/exam/exam-code');
      },
      (error) => {}
    );
  }
  
  openSweetAlert(): void {
    Swal.fire({
      title: 'Invalid Action',
      text: `This operation is not allowed Zero warnings remaining next time exam will submit automatically`,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton:false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.onSubmit();
      } else {
        this.onCancel();
      }
    });
  
  }
  toggleFullscreen() {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      // Request fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
 
  }
