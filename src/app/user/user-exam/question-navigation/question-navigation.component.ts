import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-navigation',
  templateUrl: './question-navigation.component.html',
  styleUrls: ['./question-navigation.component.css']
})
export class QuestionNavigationComponent implements OnInit{

  @Input() listOfQuestion: any;
  @Input() totalQuestion: any;
  ngOnInit(): void {

  }
  getQuestionNumbers(): number[] {
    return Array.from({ length: this.totalQuestion}, (_, index) => index + 1);
  }
}
