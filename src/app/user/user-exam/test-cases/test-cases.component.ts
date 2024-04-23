import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-test-cases',
  templateUrl: './test-cases.component.html',
  styleUrls: ['./test-cases.component.css']
})
export class TestCasesComponent implements OnInit {

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.getAllTestCases();
  }
  
  codingQuestionTestCases: any[] = [];
  selectedCaseIndex: number = 0;
  isTestCaseSelected: boolean = true;
  selectedButton: string = '';


  getAllTestCases() {
    this.examService.getExamCodingQuestions().subscribe(
      (response) => {
        this.codingQuestionTestCases = response;
      },
      (error) => { }
    );
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
  


  
}
