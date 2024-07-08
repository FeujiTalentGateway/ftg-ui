import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { QuestionRepository } from './question-repository.service';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question';

describe('QuestionRepository', () => {
  let service: QuestionRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionRepository],
    });
    service = TestBed.inject(QuestionRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all questions', () => {
    const mockQuestions: Question[] = [{
      id: 1, content: 'Test Question 1',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    }, {
      id: 2, content: 'Test Question 2',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    }];

    service.getAllQuestions().subscribe((questions) => {
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);
  });

  it('should handle error when fetching all questions', () => {
    const errorMessage = '';

    service.getAllQuestions().subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('network error'), { status: 500 });
  });

  it('should fetch questions by subject', () => {
    const subjectId = 1;
    const mockQuestions: Question[] = [{
      id: 1, content: 'Test Question 1',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    }, {
      id: 2, content: 'Test Question 2',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    }];

    service.getQuestionsBySubject(subjectId).subscribe((questions) => {
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne(`${environment.pythonUrl}/api/questions/${subjectId}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockQuestions);
  });

  it('should handle error when fetching questions by subject', () => {
    const subjectId = 1;
    const errorMessage = '';

    service.getQuestionsBySubject(subjectId).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.pythonUrl}/api/questions/${subjectId}/`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('network error'), { status: 500 });
  });

  it('should add a question', () => {
    const mockQuestion: Question = {
      id: 1, content: 'New Question',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    };

    service.addQuestion(mockQuestion).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should handle error when adding a question', () => {
    const mockQuestion: Question = {
      id: 1, content: 'New Question',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    };
    const errorMessage = '';

    service.addQuestion(mockQuestion).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('network error'), { status: 500 });
  });

  it('should edit a question', () => {
    const mockQuestion: Question = {
      id: 1, content: 'Updated Question',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    };

    service.editQuestion(mockQuestion).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should handle error when editing a question', () => {
    const mockQuestion: Question = {
      id: 1, content: 'Updated Question',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject:{ id: 1,
        name: "Java",
        active: true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    };
    const errorMessage = '';

    service.editQuestion(mockQuestion).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('PUT');
    req.error(new ErrorEvent('network error'), { status: 500 });
  });

  it('should delete a question', () => {
    const questionId = 1;

    service.deleteQuestion(questionId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.adminUrl}question/deactivate/${questionId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle error when deleting a question', () => {
    const questionId = 1;
    const errorMessage = '';

    service.deleteQuestion(questionId).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.adminUrl}question/deactivate/${questionId}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('network error'), { status: 500 });
  });

  it('should fetch all questions by subject ID with pagination', () => {
    const subjectId = 1;
    const page = 1;
    const pageSize = 10;
    const mockResponse = { questions: [{ id: 1, content: 'Question 1' }, { id: 2, content: 'Question 2' }], totalItems: 2 };

    service.getAllQuestionsBySubjectId(subjectId, page, pageSize).subscribe((response) => {
      expect(response.questions.length).toBe(2);
      expect(response.totalItems).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.pythonUrl}api/questions/${subjectId}/?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should filter questions by difficulty level', () => {
    const subjectId = 1;
    const difficultyLevel = 2;
    const page = 1;
    const pageSize = 10;
    const mockResponse = { questions: [{ id: 1, content: 'Question 1' }, { id: 2, content: 'Question 2' }], totalItems: 2 };

    service.filterQuestionsBasedOnDifficultyLevel(subjectId, difficultyLevel, page, pageSize).subscribe((response) => {
      expect(response.questions.length).toBe(2);
      expect(response.totalItems).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.pythonUrl}api/questions/${subjectId}/?difficultyLevel=${difficultyLevel}&page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should filter questions by search query', () => {
    const subjectId = 1;
    const page = 1;
    const pageSize = 10;
    const searchQuery = 'test';
    const mockResponse = { questions: [{ id: 1, content: 'Question 1' }, { id: 2, content: 'Question 2' }], totalItems: 2 };

    service.filterQuestionsBasedOnSearchQuery(subjectId, page, pageSize, searchQuery).subscribe((response) => {
      expect(response.questions.length).toBe(2);
      expect(response.totalItems).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.pythonUrl}api/questions/${subjectId}/?content=${searchQuery}&page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should filter questions by difficulty level and search query', () => {
    const subjectId = 1;
    const difficultyLevel = 2;
    const page = 1;
    const pageSize = 10;
    const searchQuery = 'test';
    const mockResponse = { questions: [{ id: 1, content: 'Question 1' }, { id: 2, content: 'Question 2' }], totalItems: 2 };

    service.filterQuestionsBasedOnDifficultyLevelWithSearchQuery(subjectId, difficultyLevel, page, pageSize, searchQuery).subscribe((response) => {
      expect(response.questions.length).toBe(2);
      expect(response.totalItems).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.pythonUrl}api/questions/${subjectId}/?content=${searchQuery}&difficultyLevel=${difficultyLevel}&page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});

