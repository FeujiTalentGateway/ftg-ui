import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-detailed-user-result',
  templateUrl: './detailed-user-result.component.html',
  styleUrls: ['./detailed-user-result.component.css']
})
export class DetailedUserResultComponent implements OnInit {
  examCode: string | undefined;
  examObject$: Observable<Exam> | undefined;
  examObject : Exam | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ){}
  ngOnInit(){
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode') as string;
    this.examObject$ = this.examService.getStaticExamById();

    this.examObject$.subscribe(
      (response)=>{
        this.examObject = response;
      },
      (error)=>{
        console.log("errorrrr");
        
      }
    );

  }

 

  

}
