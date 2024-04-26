import { Injectable } from '@angular/core';
import { ExamService } from '../repository/exam.service';
import { Observable, Subject as RxSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestCaseResultService {

  testCaseResult: any;
  private testCasesChanged = new RxSubject<void>();
  testCasesChanged$ = this.testCasesChanged.asObservable();

  constructor(private examservice: ExamService) { }


  errorMessage: any;
  testResult: any;

  executeCode(codeValue: any) {
    this.examservice.executeCode(codeValue).subscribe((res) => {

      this.testResult = res
      console.log(this.testResult);

      this.errorMessage = null;
      this.testCasesChanged.next(this.testResult)
    },
      (error) => {
        console.error('Error fetching test result data:', error);
        console.log(error.error.message);
        this.errorMessage = error.error;
        this.testResult = null;
        this.testCasesChanged.next(this.errorMessage)
      })
  }

  

}
