import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paper } from '../models/paper';
import { ExamSubject } from '../models/examSubject';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  
  private examTime = new BehaviorSubject<any>(null);
  examTime$ = this.examTime.asObservable();

  private examAttempt = new BehaviorSubject<any>(null);
  examAttempt$ = this.examAttempt.asObservable();

  private indexPositionOfSubject = new BehaviorSubject<any>(null);
  indexPositionOfSubject$ = this.indexPositionOfSubject.asObservable();

  private currentExamSubjects = new BehaviorSubject<ExamSubject[]>([]);
  currentExamSubjects$ = this.currentExamSubjects.asObservable();

  private updateLastQuestion = new BehaviorSubject<any>(null);
  updateLastQuestion$ = this.updateLastQuestion.asObservable();

  private remainingTime = new BehaviorSubject<any>(null);
  remainingTime$ = this.remainingTime.asObservable();

  private subjectStatus = new BehaviorSubject<any>(null);
  subjectStatus$ = this.subjectStatus.asObservable();

  private callSystemSubmitExam = new BehaviorSubject<any>(null);
  callSubmitExam$ = this.callSystemSubmitExam.asObservable();

  updateSubjectIndex$: Observable<number> | undefined;

  updateExamTime(time: any) {
    this.examTime.next(time);
  }
  updateExamAttempt(examAttemptID: number) {
    this.examAttempt.next(examAttemptID);
  }

  updateSubjects(examSubject: ExamSubject[]) {
    this.currentExamSubjects.next(examSubject);
  }
  updateSubjectIndex(indexPositionOfSubject: number) {
    this.indexPositionOfSubject.next(indexPositionOfSubject);
  }
  updateLastQuestionAndSave(lastQuestion: any) {
    this.updateLastQuestion.next(lastQuestion);
  }
  getRemainingTime(): any {
    let reamingTime = 0;
    this.remainingTime$.subscribe((response) => {
      if (response != null) {
        reamingTime = response;
      } else {
        reamingTime = 0;
      }
    });
    return reamingTime;
  }
  updateRemainingTime(time: any) {
    this.remainingTime.next(time);
  }
  updateSubjectStatus(status: any) {
    console.log(status, 'status');
    
    this.subjectStatus.next(status);
  }
  callSubmitExam(isSystemSubmitted: boolean) {
    this.callSystemSubmitExam.next(isSystemSubmitted);
  }
}
