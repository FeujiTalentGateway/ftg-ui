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
    this.getoption();
  }
  getQuestionNumbers(): number[] {
    return Array.from({ length: this.totalQuestion }, (_, index) => index + 1);
  }
  getNavigationStatus(num: number,currentQuestion: number): string {
    if (num < this.listOfQuestion.length) {
      const question = this.listOfQuestion[num];
      if (question.optionSelected?.length === 0) {
        if(num+1<this.listOfQuestion.length ) {
          return 'not-answered';
        }
        else{
          return '';
        }
      } else {
        return 'answered';
      }
    } else {
      return 'disabled';
    }
   }
  @Output() questionChanged: EventEmitter<number> = new EventEmitter<number>();
  changeQuestion(num: number) {
    this.questionChanged.emit(num);
  }
  getoption() {
    this.listOfQuestion.forEach((question) => {
      console.log(question.optionSelected);
    });
  }
}
