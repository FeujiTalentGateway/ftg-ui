import { TestBed } from '@angular/core/testing';
import { QuestionRepository } from './question-repository.service';

describe('questionRepository', () => {
  let service: QuestionRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
