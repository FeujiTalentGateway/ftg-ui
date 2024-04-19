import { TestBed } from '@angular/core/testing';
import { QuestionRepository } from './question-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('questionRepository', () => {
  let service: QuestionRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
