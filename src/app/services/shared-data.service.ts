import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private examTime = new BehaviorSubject<any>(null);
  examTime$ = this.examTime.asObservable();

  updateExamTime(time: any) {
    this.examTime.next(time);
  }
  
}
