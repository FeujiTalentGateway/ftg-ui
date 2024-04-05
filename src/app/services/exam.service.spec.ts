import { TestBed } from '@angular/core/testing';

import { ExamServiceForLogic } from './ExamServiceForLogic';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ExamServiceForLogic', () => {
  let service: ExamServiceForLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        MatSnackBarModule],
    });
    service = TestBed.inject(ExamServiceForLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
