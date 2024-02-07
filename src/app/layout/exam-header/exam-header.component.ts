import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, interval } from 'rxjs';
import { Paper } from 'src/app/models/paper';
import { ExamService } from 'src/app/repository/exam.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

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
  examAttemptId?: number;
  examCode: string | null = null;

  constructor(
    private sharedService: SharedDataService,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.examTime$ = this.sharedService.examTime$;
    this.examAttempt$ = this.sharedService.examAttempt$;
    if (this.examTime$ != null) {
      this.examTime$.subscribe((response) => {
        console.log(response);
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
        console.log(response);
        this.examAttemptId = response;

        // if (response != null) {
        //   this.examAttemptId = response.exam_attempt_id;
        //   console.log(this.examAttemptId);
        // }
      });
    }
  }
  setCountDownValue() {
    this.countdownDuration = this.getTime(this.examTime); // 20 minutes and 20 seconds in seconds
  }

  private startCountdown() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdownDuration--;

      if (this.countdownDuration >= 0) {
        this.updateCountdownDisplay();
      } else {
        this.countdownSubscription?.unsubscribe();
        console.log('Countdown reached zero!');
        this.submitExam()
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
      console.log(time);
      time += hours * 60 * 60;
    }

    if (minutes > 0) {
      time += minutes * 60;
    }

    return time;
  }

  submitExam() {
    console.log(
      this.examAttemptId,
      this.examCode,
      '00000000000000000000000000'
    );

    this.examService
      .submitExam(this.examAttemptId as number, this.examCode as string)
      .subscribe(
        (response) => {
          console.log(response);
          let url  = `/user/exam/exam-submitted/${this.examCode}/${this.examAttemptId}`
          this.router.navigateByUrl(url);
        },
        (error) => {}
      );
  }



}
// *ngIf="date$ | async as data; else loading"
