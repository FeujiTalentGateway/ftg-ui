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
  updateSubjectIndex$: Observable<number> | undefined;

  updateExamTime(time: any) {
    this.examTime.next(time);
  }
  updateExamAttempt(examAttemptID: number) {
    this.examAttempt.next(examAttemptID);
    console.log(examAttemptID);
  }

  updateSubjects(examSubject: ExamSubject[]) {
    this.currentExamSubjects.next(examSubject);
    console.log(examSubject);
  }
  updateSubjectIndex(indexPositionOfSubject: number) {
    this.indexPositionOfSubject.next(indexPositionOfSubject);
    console.log(indexPositionOfSubject);
  }
}
