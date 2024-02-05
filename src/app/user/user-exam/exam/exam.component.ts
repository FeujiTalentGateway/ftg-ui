import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  examCode: string | null = null;
  paper: Paper | null = null;
  currentQuestion: Question | undefined;
  QuestionNumber: Number = 0;
  questionsList: Question[] = [];
  examAttemptId: number | undefined;
  questions$: Observable<Paper> | undefined;
  Exam$: Observable<any> | undefined;
  examDuration :string |undefined ;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode');
    console.log(this.examCode);
    this.questions$ = this.examService.getPaperByExamCode(
      this.examCode as string
    );
    this.Exam$ = this.examService.checkExamByCode(this.examCode as string)
    // this.sharedDataService.examTime$.subscribe(
    //   (response)=>{
    //     console.log(response);
        
    //     this.examDuration = response

    //   }
    // )
    this.examService.checkExamByCode(this.examCode as string).subscribe(
      (response)=>{
        console.log(response);
        this.examDuration  = response.duration
        console.log(this.examDuration);
        
        const newData = {'exam_time':this.examDuration };
        this.sharedDataService.updateExamTime(newData);

      }
    )
    
  }

  getQuestions(): Question[] {
    return this.questionsList;
  }
  getExamAttemptId() {
    return this.examAttemptId;
  }
}
