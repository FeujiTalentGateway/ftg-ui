import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paper } from '../models/paper';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private examTime = new BehaviorSubject<any>(null);
  examTime$ = this.examTime.asObservable();

  private examAttempt = new BehaviorSubject<any>(null);
  examAttempt$ = this.examAttempt.asObservable()

  updateExamTime(time: any) {
    this.examTime.next(time);
  }
  updateExamAttempt(examAttemptID: number) {
    this.examAttempt.next(examAttemptID)
    console.log(examAttemptID);
    
  }
}
