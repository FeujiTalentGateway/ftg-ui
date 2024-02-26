import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, interval } from 'rxjs';
import { ExamSubject } from 'src/app/models/examSubject';
import { Paper } from 'src/app/models/paper';
import { ExamService } from 'src/app/repository/exam.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ConfirmDialogforuserComponent } from 'src/app/utils/confirm-dialogforuser/confirm-dialogforuser.component';
import { MassageboxComponent } from 'src/app/utils/massagebox/massagebox.component';

@Component({
  selector: 'app-exam-header',
  templateUrl: './exam-header.component.html',
  styleUrls: ['./exam-header.component.css'],
})
export class ExamHeaderComponent {
  sharedData: any;
  examTime: string = '';
  examTime$: Observable<any> | undefined;
  countdownDuration: number = this.getTime(this.examTime); // 20 minutes and 20 seconds in seconds
  countdownDisplay: string = '';
  private countdownSubscription: Subscription | undefined;
  examAttempt$: Observable<any> | undefined;
  currentSubjects$: Observable<ExamSubject[]> | undefined;
  updateSubjectIndex$: Observable<number> | undefined;
  updateSubjectIndex: number = 0;
  currentSubjects: ExamSubject[] = [];
  examAttemptId?: number;
  examCode: string | null = null;

  constructor(
    private sharedService: SharedDataService,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.snackBarService.openRedAlertSnackBar("all the best ")
    this.examTime$ = this.sharedService.examTime$;
    this.examAttempt$ = this.sharedService.examAttempt$;
    this.currentSubjects$ = this.sharedService.currentExamSubjects$;
    this.updateSubjectIndex$ = this.sharedService.indexPositionOfSubject$;

    if (this.examTime$ != null) {
      this.examTime$.subscribe((response) => {
        if (response != null) {
          this.examTime = response.exam_time;
          this.examCode = response.examCode;
          this.setCountDownValue();
          this.startCountdown();
        }
      });
    }
    if (this.examAttempt$ != null) {
      this.examAttempt$.subscribe((response) => {
        this.examAttemptId = response;

        // if (response != null) {
        //   this.examAttemptId = response.exam_attempt_id;
        // }
      });
    }

    if (this.currentSubjects$ != null) {
      this.currentSubjects$.subscribe((response) => {
        this.currentSubjects = response;
      });
    }
    this.updateSubjectIndex$.subscribe((response) => {
      this.updateSubjectIndex = response;
    });
  }
  setCountDownValue() {
    this.countdownDuration = this.getTime(this.examTime); // 20 minutes and 20 seconds in seconds
  }

  private startCountdown() {
    this.countdownSubscription?.unsubscribe();
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdownDuration--;

      if (this.countdownDuration >= 0) {
        this.updateCountdownDisplay();
      } else if (this.countdownDuration == 120) {
        this.snackBarService.showSnackbar('you have only 2 min left');
      } else {
        this.countdownSubscription?.unsubscribe();

        if (
          this.updateSubjectIndex <
          (this.currentSubjects?.length as number) - 1
        ) {
          this.updateSubjectIndex += 1;
          this.examTime =
            this.currentSubjects[this.updateSubjectIndex].duration;
          this.setCountDownValue();
          this.startCountdown();
          this.sharedService.updateSubjectIndex(this.updateSubjectIndex);
        } else {
          this.submitExam(true);
        }
      }
    });
  }

  private updateCountdownDisplay() {
    const minutes = Math.floor(this.countdownDuration / 60);
    const seconds = this.countdownDuration % 60;

    this.countdownDisplay = `${this.padWithZero(minutes)}:${this.padWithZero(
      seconds
    )}`;
  }

  private padWithZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy(): void {
    this.countdownSubscription?.unsubscribe();
  }

  getTime(stringTime: string): number {
    stringTime = this.examTime;
    let time = 0;
    const timeArray = stringTime.split(':');
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    const seconds = parseInt(timeArray[2], 10);

    if (hours > 0) {
      time += hours * 60 * 60;
    }

    if (minutes > 0) {
      time += minutes * 60;
    }
    if (seconds > 0) {
      time += seconds;
    }

    return time;
  }

  submitExam(isSystemSubmitted: boolean = false) {
    console.log(this.examAttemptId, this.examCode);

    let messages = 'sure are you want to submit Exam';
    let title = 'Submit Exam ?';
    if (!isSystemSubmitted) {
      const dialogRef = this.dialog.open(ConfirmDialogforuserComponent, {
        data: { title: title, message: messages + '', note: 'ok' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.performSubmit()          
        } else {
          console.log('cancel');
        }
      });
    } else {
      this.performSubmit()
    }
  }

  performSubmit(){
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
        this.router.navigateByUrl('/user/home');
      },
      (error) => {
        console.log(error, 'error i am getting');
      }
    );
    this.countdownSubscription?.unsubscribe();
   
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
