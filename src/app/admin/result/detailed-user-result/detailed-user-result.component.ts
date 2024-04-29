import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { DetailedUserResult } from 'src/app/models/detailedUserResult.model';

@Component({
  selector: 'app-detailed-user-result',
  templateUrl: './detailed-user-result.component.html',
  styleUrls: ['./detailed-user-result.component.css']
})
export class DetailedUserResultComponent implements OnInit {
  examCode: string | undefined;
  examObject$: Observable<Exam> | undefined;
  userId : number | undefined | null;
  examObject : Exam | undefined;
  examDuration:string | undefined;
  duration:string | undefined;
  strokeWidth: number = 10;
  circumference: number = Math.PI * 180;
  detailedUserResultObject : DetailedUserResult | undefined;
  detailedUserResultObject$ : Observable<DetailedUserResult> | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
  ){}
  ngOnInit(){
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode') as string;
    this.userId =  this.activatedRoute.snapshot.paramMap.get('userId') as number | null | undefined; 
    this.examObject$ = this.examService.getExamByCode(this.examCode);
    this.detailedUserResultObject$ = this.examService.getDetailedUserResult(this.examCode,this.userId as number);
    console.log(this.detailedUserResultObject$.subscribe(res=>{
      console.log(res)
    }))
    this.calculateProgress();
  }
  
  parseDurationToSeconds(durationString: string): number {
    const durationParts = durationString.split(':');
    const hours = parseInt(durationParts[0], 10) || 0;
    const minutes = parseInt(durationParts[1], 10) || 0;
    const seconds = parseInt(durationParts[2], 10) || 0;
    const totalDurationInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalDurationInSeconds;
  }

  calculateProgress(): number {
    if (!this.examDuration || !this.duration) {
      return 0;
    }
    const examDurationInSeconds = this.parseDurationToSeconds(this.duration);
    const userDurationInSeconds = this.parseDurationToSeconds(this.examDuration);
    const progressPercentage = (userDurationInSeconds / examDurationInSeconds) * 100;
    return progressPercentage;
  }

  handleDetailedUserResultObject(detailedUserResult:DetailedUserResult){
    this.examDuration = detailedUserResult.examDuration
    return true
  }
  handleExamObject(exam:Exam){
    this.duration = exam.duration
    return true
  }

}
