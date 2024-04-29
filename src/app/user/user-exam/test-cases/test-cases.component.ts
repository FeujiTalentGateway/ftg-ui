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

  constructor(private examServiceRepo: ExamService, private testCaseResultService: TestCaseResultService) { }

  ngOnInit(): void {
    this.fetchTestResultData();
    this.testCaseResultService.codeExecutionCompleted.subscribe(() => {
      this.selectButton('test-result');
    });
  }

  selectButton(button: string) {
    this.isTestCaseSelected = button === 'test-case';
    this.selectedButton = button;
  }

  selectTestCaseButton(index: number) {
    this.selectedCaseIndex = index;
  }

  fetchTestResultData(): void {
    this.testCaseResultService.testCasesChanged$.subscribe(
      (res: any) => {
        if (res && res.message) {
          this.errorMessage = res.message;
          this.testResult = null;
        } else {
          this.testResult = res;
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
