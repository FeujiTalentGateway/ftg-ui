import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamSubject } from 'src/app/models/examSubject';
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
export class ExamHeaderComponent implements OnInit, OnDestroy {
  sharedData: any;
  examTime: string = '';
  examTime$: Observable<any> | undefined;
  countdownDuration: number = this.getTime(this.examTime);
  countdownDisplay: string = '';
  private countdownSubscription: Subscription | undefined;
  examAttempt$: Observable<any> | undefined;
  currentSubjects$: Observable<ExamSubject[]> | undefined;
  updateSubjectIndex$: Observable<number> | undefined;
  updateSubjectIndex: number = 0;
  currentSubjects: ExamSubject[] = [];
  examAttemptId?: number;
  examCode: string | null = null;
  subjectStatus$: Observable<any> | undefined;
  isSystemSubmittedExam$: Observable<any> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private sharedService: SharedDataService,
    private examService: ExamService,
    private router: Router,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.examTime$ = this.sharedService.examTime$.pipe(
      takeUntil(this.unsubscribe$)
    );
    this.examAttempt$ = this.sharedService.examAttempt$.pipe(
      takeUntil(this.unsubscribe$)
    );
    this.currentSubjects$ = this.sharedService.currentExamSubjects$.pipe(
      takeUntil(this.unsubscribe$)
    );
    this.updateSubjectIndex$ = this.sharedService.indexPositionOfSubject$.pipe(
      takeUntil(this.unsubscribe$)
    );
    this.subjectStatus$ = this.sharedService.subjectStatus$.pipe(
      takeUntil(this.unsubscribe$)
    );
    this.isSystemSubmittedExam$ = this.sharedService.callSubmitExam$.pipe(
      takeUntil(this.unsubscribe$)
    );

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
    this.isSystemSubmittedExam$.subscribe((response) => {
      if (response != null) {
        this.submitExam(true);
      }
    });
  }
  setCountDownValue() {
    this.countdownDuration = this.getTime(this.examTime); // 20 minutes and 20 seconds in seconds
  }

  private startCountdown() {
    this.countdownSubscription?.unsubscribe();

    this.countdownSubscription = interval(1000).subscribe(() => {
      this.sharedService.updateRemainingTime(
        this.convertSecondsToTime(this.countdownDuration)
      );
      this.countdownDuration--;
      if (this.countdownDuration >= 0) {
        if (this.countdownDuration == 120) {
          this.snackBarService.openRedAlertSnackBar('you have only 2 min left');
        }
        this.updateCountdownDisplay();
      } else {
        this.countdownSubscription?.unsubscribe();
        this.submitExam(true);
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
    let messages = 'Are you sure to submit the exam?';
    let title = 'Submit Exam';
    if (!isSystemSubmitted) {
      const dialogRef = this.dialog.open(ConfirmDialogforuserComponent, {
        data: { title: title, message: messages + '', note: '' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.countdownSubscription?.unsubscribe();
          this.performSubmit();
        } else {
        }
      });
    } else {
      this.countdownSubscription?.unsubscribe();
      this.performSubmit();
    }
  }

  performSubmit() {
    this.sharedService.updateLastQuestionAndSave(true);
    this.examService.submitExam(this.examAttemptId as number).subscribe(
      (response) => {
        const dialogRef = this.dialog.open(MassageboxComponent, {
          data: {
            title: 'Completed !',
            message: 'Your answers have been submitted successfully .' + '',
            note: 'ok',
          },
        });
        this.toggleFullscreen();
        this.router.navigateByUrl('/user/exam/exam-code');
      },
      (error) => {}
    );
    this.countdownSubscription?.unsubscribe();
  }
  toggleFullscreen() {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      // Request fullscreen
      if (element.requestFullscreen) {
        if (false) {
          element.requestFullscreen();
        }
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
  convertSecondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padWithZero(hours)}:${this.padWithZero(
      minutes
    )}:${this.padWithZero(remainingSeconds)}`;
  }
  updateSubjectStatus(status: any) {
    this.sharedService.updateSubjectStatus(status);
  }
  checkSubjectsAvailability(): boolean {
    let isAvailable = false;
    this.currentSubjects.map((item) => {
      if (item.isTimeUp == false) {
        isAvailable = true;
      }
    });
    return isAvailable;
  }

  ngOnDestroy(): void {
    this.countdownSubscription?.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
