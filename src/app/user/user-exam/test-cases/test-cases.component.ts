import { Component, Input, OnInit } from '@angular/core';
import { ExamService } from 'src/app/repository/exam.service';
import { TestCaseResultService } from 'src/app/services/test-case-result.service';

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

  constructor(private examServiceRepo: ExamService,private testCaseResultService:TestCaseResultService) {}

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
    this.testCaseResultService.testCasesChanged$.subscribe(
      (res: any) => { 
        console.log(res);
        
        if (typeof res === 'object' && res !== null && res.hasOwnProperty('message')) {
          this.errorMessage = res.message; 
          this.testResult = null;
          console.log( this.errorMessage);
          
        } else {
          this.testResult = res; 
          this.errorMessage = null;
          console.log( this.testResult);
          
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
