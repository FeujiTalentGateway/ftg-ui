import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent implements OnInit {
  @Input() currentCodingQuestion: any;
  @Input() codingQuestionIndex!: number;

  selectedCaseIndex: number = 0;
  isTestCaseSelected: boolean = true;
  selectedButton: string = '';
  testResult: any;
  errorMessage: any;

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.fetchTestResultData();
  }

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

  fetchTestResultData() {
    this.examService.fetchTestResultData().subscribe(
      (res) => {
        if (res.hasOwnProperty('message')) {
          this.errorMessage = res; // Set error message
          this.testResult = null;
        } else {
          this.testResult = res; // Set test result
          this.errorMessage = null;
        }
      },
      (error) => {
        console.error('Error fetching test result data:', error);
        this.errorMessage = { message: 'An error occurred while fetching data', type: 'Error' };
        this.testResult = null;
      }
    );
  }
}
