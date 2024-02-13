import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-exam-summary',
  templateUrl: './exam-summary.component.html',
  styleUrls: ['./exam-summary.component.css']
})
export class ExamSummaryComponent implements OnInit {
  examCode:string |undefined;
  examObject : Exam |undefined;
  examObject$ : Observable<Exam>| undefined;
  constructor(
    private router : Router,
    private activateRoute : ActivatedRoute,
    private examService : ExamService  
    ){}

  ngOnInit(
  
  ){
     this.examCode = this.activateRoute.snapshot.paramMap.get('examCode') as string;
     console.log(this.examCode);
     this.examObject$ = this.examService.getStaticExamById()
     this.examObject$.subscribe(
      (response)=>{
        this.examObject = response;
      },
      (error)=>{
        console.log("errorrrr");
        
      }
     )
  }

}
