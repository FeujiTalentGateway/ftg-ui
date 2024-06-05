import { Component, Input } from '@angular/core';
import { CodingQuestion } from 'src/app/models/coding.question.model';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-coding-questions',
  templateUrl: './coding-questions.component.html',
  styleUrls: ['./coding-questions.component.css']
})
export class CodingQuestionsComponent {
  constructor(private examService:ExamService) {
  }
  codingQuestion:any[]=[];
 @Input() currentCodingQuestion!: CodingQuestion;
 @Input() codingQuestionIndex!: number;
  ngOnInit(){

  }

}
