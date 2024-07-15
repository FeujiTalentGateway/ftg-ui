import { TestBed } from '@angular/core/testing';

import { CodingQuestionService } from './coding-question.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CodingQuestionService', () => {
  let service: CodingQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      HttpClientTestingModule,
     
      BrowserAnimationsModule
    ],});
    service = TestBed.inject(CodingQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
