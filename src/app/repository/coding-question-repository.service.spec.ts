import { TestBed } from '@angular/core/testing';

import { CodingQuestionRepositoryService } from './coding-question-repository.service';

describe('CodingQuestionRepositoryService', () => {
  let service: CodingQuestionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodingQuestionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
