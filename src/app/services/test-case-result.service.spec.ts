import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestCaseResultService } from './test-case-result.service';
import { ExamService } from '../repository/exam.service';
import { of } from 'rxjs';

describe('TestCaseResultService', () => {
  let service: TestCaseResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestCaseResultService, ExamService]
    });
    service = TestBed.inject(TestCaseResultService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should execute code and emit test result', () => {
    const mockCode = 'console.log("Hello, World!");';
    const mockLanguage = 'java';
    const mockResponse = { output: 'Hello, World!\n', errors: null };

    service.executeCode(mockCode, mockLanguage);

    const req = httpMock.expectOne(`http://localhost:8093/exam/coding-question/run`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    service.testCasesChanged$.subscribe(result => {
      expect(service.testResult).toEqual(mockResponse);
      expect(service.errorMessage).toBeNull();
    });

    service.codeExecutionCompleted.subscribe(() => {
      expect().nothing(); // No action needed after code execution
    });
  });

  it('should handle error when executing code', () => {
    const mockCode = 'invalid code';
    const mockLanguage = 'java';
    const mockErrorResponse = { message: 'Syntax error' };

    service.executeCode(mockCode, mockLanguage);

    const req = httpMock.expectOne(`http://localhost:8093/exam/coding-question/run`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('network error'), { status: 500, statusText: 'Server Error' });

    service.testCasesChanged$.subscribe(result => {
      expect(service.testResult).toBeNull();
      expect(service.errorMessage).toEqual(mockErrorResponse);
    });

    service.codeExecutionCompleted.subscribe(() => {
      expect().nothing(); 
    });
  });
});
