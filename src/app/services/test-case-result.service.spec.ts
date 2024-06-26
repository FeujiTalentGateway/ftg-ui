import { TestBed } from '@angular/core/testing';

import { TestCaseResultService } from './test-case-result.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestCaseResultService', () => {
  let service: TestCaseResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(TestCaseResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
