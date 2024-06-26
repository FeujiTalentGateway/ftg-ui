import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { MassageboxComponent } from 'src/app/utils/massagebox/massagebox.component';
import Swal from 'sweetalert2';
import { ExamInstructionsComponent } from '../exam-instructions/exam-instructions.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  @ViewChild(ExamInstructionsComponent)
  codeEditorComponent!: ExamInstructionsComponent;
  
  isFirstAttempt:boolean=true
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
  toogleLock: boolean = false;
  LOCKED_KEYS: string[] = [
    'MetaLeft',
    'MetaRight',
    'KeyN',
    'KeyT',
    'KeyR',
    'Escape',
    'AltLeft',
    'AltRight',
    'ControlLeft',
    'ControlRight',
  ];
  warningCount: number = 0;
  examAttempt$: Observable<any> | undefined;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private sharedDataService: SharedDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
   // this.lockKeys();
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

    document.addEventListener(
      'fullscreenchange',
      this.onFullscreenChange.bind(this)
    );
  }

  onFullscreenChange(event: Event) {
    if (document.fullscreenElement === null && !(this.examService.examsubmitted)) {
          this.openSweetAlert()
    }
    
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
      if(event.code=="ControlLeft"|| event.code=="ControlRight"  || event.code=="AltLeft" || event.code=="AltRight" || event.code=="Escape" ){
        this.openFullScreen()
          if(!this.isFirstAttempt){
            this.onSubmit()
          }
          else{
            this.isFirstAttempt=false
            this.openSweetAlert()
          }
      }
    }
  
  onCancel(): void {
   this.openFullScreen()
    Swal.close();
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
        this.exitFullScreen();
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
      showConfirmButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.onSubmit();
      } else {
        this.onCancel();
      }
    });
  }
  // toggleFullscreen() {
  //   const element = document.documentElement;

  //   if (!document.fullscreenElement) {
  //     // Request fullscreen
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     }
  //   } else {
  //     // Exit fullscreen
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     }
  //   }
  // }
  openFullScreen(){
    const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
  }
  exitFullScreen(){
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  

}
