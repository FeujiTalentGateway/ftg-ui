import { Injectable } from '@angular/core';
import { ExamService } from '../repository/exam.service';
import { Observable, Subject as RxSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestCaseResultService {


  testCaseResult: any;
  private testCasesChanged = new RxSubject<void>();
  testCasesChanged$ = this.testCasesChanged.asObservable();

  constructor(private examservice: ExamService) { }
  codeExecutionCompleted = new Subject<void>();

  errorMessage: any;
  testResult: any;

  executeCode(codeValue: any,language: string) {
    this.examservice.executeCodeForLanguage(codeValue,language).subscribe((res) => {

      this.testResult = res

      this.errorMessage = null;
      this.testCasesChanged.next(this.testResult)
      this.codeExecutionCompleted.next();
    },
      (error) => {
        console.error('Error fetching test result data:', error);
        this.errorMessage = error.error;
        this.testResult = null;
        this.testCasesChanged.next(this.errorMessage)
        this.codeExecutionCompleted.next();

      })


  }
  
  submitResult: any;
  submitCode(requestPayload: any): Observable<any> {
    return this.examservice.submitCode(requestPayload);
  }
}
