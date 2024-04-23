import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent implements OnInit {

  constructor(private examService: ExamService) {}

  @Input() currentCodingQuestion:any;
  @Input() codingQuestionIndex!: number;

  ngOnInit(): void {
  }
  selectedCaseIndex: number = 0;
  isTestCaseSelected: boolean = true;
  selectedButton: string = '';


  selectTestCase() {
    this.isTestCaseSelected = true;
    this.selectedButton = 'test-case';
  }

  selectTestResult() {
    this.isTestCaseSelected = false;
    this.selectedButton = 'test-result';
  }

  selectTestCaseButton(index: number) {
    this.selectedCaseIndex = index;
  }
  


  
}
