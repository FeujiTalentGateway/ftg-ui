import { TestBed } from '@angular/core/testing';

import { ExamServiceForLogic } from './ExamServiceForLogic';

describe('ExamServiceForLogic', () => {
  let service: ExamServiceForLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamServiceForLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
