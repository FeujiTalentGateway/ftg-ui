import { TestBed } from '@angular/core/testing';
import { SharedDataService } from './shared-data.service';
import { ExamSubject } from '../models/examSubject';
import { skip } from 'rxjs';

describe('SharedDataService', () => {
  let service: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    
  });

  it('should update and emit exam attempt ID', (done: DoneFn) => {
    const examAttemptID = 42;
    service.examAttempt$.pipe(skip(1)).subscribe({
      next: attemptID => {
        expect(attemptID).toBe(examAttemptID);
        done();
      }
    });
    service.updateExamAttempt(examAttemptID);
  });

  

  it('should update and emit index position of subject', (done: DoneFn) => {
    const indexPosition = 3;
    service.indexPositionOfSubject$.pipe(skip(1)).subscribe({
      next: index => {
        expect(index).toBe(indexPosition);
        done();
      }
    });
    service.updateSubjectIndex(indexPosition);
  });

  it('should update and emit last question', (done: DoneFn) => {
    const lastQuestion = { id: 101, text: 'What is 2+2?' };
    service.updateLastQuestion$.pipe(skip(1)).subscribe({
      next: question => {
        expect(question).toEqual(lastQuestion);
        done();
      }
    });
    service.updateLastQuestionAndSave(lastQuestion);
  });

  it('should return remaining time', () => {
    const remainingTime = 3600;
    service.updateRemainingTime(remainingTime);
    expect(service.getRemainingTime()).toBe(remainingTime);
  });


  it('should call submit exam with system submit flag', (done: DoneFn) => {
    const isSystemSubmitted = false;
    service.callSubmitExam$.pipe(skip(1)).subscribe({
      next: flag => {
        expect(flag).toBe(isSystemSubmitted);
        done();
      }
    });
    service.callSubmitExam(isSystemSubmitted);
  });
  
});
