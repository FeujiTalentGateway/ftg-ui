import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { DatePipe } from '@angular/common';
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
  strokeWidth: number = 10;
  circumference: number = Math.PI * 180;
  detailedUserResultObject : DetailedUserResult | undefined;
  detailedUserResultObject$ : Observable<DetailedUserResult> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private datePipe: DatePipe
  ){}
  ngOnInit(){
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode') as string;
    this.userId =  this.activatedRoute.snapshot.paramMap.get('userId') as number | null | undefined; 
    this.examObject$ = this.examService.getExamById(this.examCode);
    this.detailedUserResultObject$ = this.examService.getStaticDetailedUserResult(this.examCode,this.userId as number);
  }
  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), 'dd MMM yyyy') || '';
  }

}
