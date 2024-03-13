import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-navigation',
  templateUrl: './question-navigation.component.html',
  styleUrls: ['./question-navigation.component.css'],
})
export class QuestionNavigationComponent implements OnInit {
  @Input() listOfQuestion: Question[] = [];
  @Input() totalQuestion: any;
  displayedNumber:number=0;
  ngOnInit(): void {
  }
  getQuestionNumbers(): number[] {
    return Array.from({ length: this.totalQuestion }, (_, index) => index + 1);
  }

  @Output() questionChanged: EventEmitter<number> = new EventEmitter<number>();
  changeQuestion(num: number) {
    this.questionChanged.emit(num);
  }
  selectDisplayedNumber(questionNumber: number): void {
    this.displayedNumber = questionNumber;
  }
  nextQuestion(index: number): void {
    this.displayedNumber = index+1;
    this.changeQuestion(index+1);
  }
  nextQuestions(index: number): void {
    this.displayedNumber = index;
    this.changeQuestion(index+1);
  }
  previousQuestion(index: number): void {
    this.displayedNumber = index;
    this.changeQuestion(index+1);

   }
  }

