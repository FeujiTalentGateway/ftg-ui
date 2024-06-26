import { TestBed } from '@angular/core/testing';

import { CodingQuestionRepositoryService } from './coding-question-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CodingQuestionRepositoryService', () => {
  let service: CodingQuestionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]

    });
    service = TestBed.inject(CodingQuestionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
