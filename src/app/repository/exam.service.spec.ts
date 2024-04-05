import { TestBed } from '@angular/core/testing';

import { ExamService } from './exam.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExamService', () => {
  let service: ExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
