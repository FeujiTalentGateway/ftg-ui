import { Component } from '@angular/core';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-coding-questions',
  templateUrl: './coding-questions.component.html',
  styleUrls: ['./coding-questions.component.css']
})
export class CodingQuestionsComponent {
  constructor(private examService:ExamService) {
    this.getAllQuestion();
  }

  codingQuestion:any[]=[];

   getAllQuestion(){
     this.examService.getExamCodingQuestions().subscribe(
      (response) => {
        this.codingQuestion = response;
        console.log(this.codingQuestion);
      },
      (error) => {}
    );
}
}
