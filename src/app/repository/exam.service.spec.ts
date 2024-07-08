import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExamService } from './exam.service';
import { Paper } from '../models/paper';
import { ExamStatsModel } from '../models/exam.stats.model';
import { DetailedUserResult } from '../models/detailedUserResult.model';
import { UsersResult } from '../models/users.result.model';
import { Exam } from '../models/exam.model';
import { OptionAttempt } from '../models/option.attempt';
import { CodingQuestions } from '../models/codingquestions.model';

describe('ExamService', () => {
  let service: ExamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExamService],
    });

    service = TestBed.inject(ExamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a paper by exam code', () => {
    const mockPaper: Paper = {
      id: 0,
      name: '',
      active: false,
      questions: []
    };

    service.getPaperByExamCode('exampleExamCode').subscribe((paper) => {
      expect(paper).toEqual(mockPaper);
    });

    const req = httpMock.expectOne(`${service.examUrl}exam/take-exam/exampleExamCode/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPaper);
  });

  it('should check exam by code', () => {
    const mockResponse = { message: 'Ok' };

    service.checkExamByCode('exampleExamCode').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.javaExamUrl}/by-code?examCode=exampleExamCode`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should save an option attempt', () => {
    const mockOptionAttempt: OptionAttempt = {
      question_id_i: 0,
      option_selected_id: 0,
      attempt_id_i: 0
    };

    service.saveOption(mockOptionAttempt).subscribe((response) => {
      expect(response).toBeTruthy(); 
    });

    const req = httpMock.expectOne(`${service.examUrl}exam/save-options/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockOptionAttempt);
    req.flush({}); 
  });

  it('should retrieve exam stats by exam code', () => {
    const mockExamStats: ExamStatsModel = {
      averageTimeOfExam: '',
      averageMarksOfExam: 0,
      testsCompletedUsers: 0,
      noOfCodingQuestions: 0
    };

    service.getExamStatsByExamCode('exampleExamCode').subscribe((stats) => {
      expect(stats).toEqual(mockExamStats);
    });

    const req = httpMock.expectOne(`${service.resultUrl}result/exampleExamCode`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExamStats);
  });

  it('should retrieve detailed user result', () => {
    const mockDetailedResult: DetailedUserResult = {
      fullName: '',
      examStartedAt: '',
      examCompletedAt: '',
      examDuration: '',
      totalMarks: 0,
      marksObtain: 0,
      overallPercentage: 0,
      subjectWiseResult: [],
      codingQuestionResults: []
    };

    service.getDetailedUserResult('exampleExamCode', 1).subscribe((result) => {
      expect(result).toEqual(mockDetailedResult);
    });

    const req = httpMock.expectOne(`${service.resultUrl}result/exampleExamCode/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetailedResult);
  });

  it('should retrieve user results', () => {
    const mockUserResults: UsersResult[] = [{
      fullName: '',
      totalScore: 0,
      examStartedAt: '',
      examCompletedAt: '',
      examStatus: '',
      examOutCome: '',
      noOfCodingQuestions: 0,
      noOfTestCasesPassed: 0,
      noOfTestCasesFailed: 0
    }];

    service.getUserResults('exampleExamCode').subscribe((results) => {
      expect(results).toEqual(mockUserResults);
    });

    const req = httpMock.expectOne(`${service.resultUrl}result/exampleExamCode?viewResultTable=true`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResults);
  });

  it('should retrieve an exam by code', () => {
    const mockExam: Exam = {
      id: 1,
      name: '',
      description: '',
      examCode: '',
      duration: '',
      startDate: '',
      endDate: '',
      active: false,
      created_at_ts: '',
      examSubjects: [],
      users: []
    };

    service.getExamByCode('exampleExamCode').subscribe((exam) => {
      expect(exam).toEqual(mockExam);
    });

    const req = httpMock.expectOne(`${service.javaExamUrl}/code/exampleExamCode`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExam);
  });

  it('should retrieve coding questions', () => {
    const mockCodingQuestions: CodingQuestions[] = [{
      id: 0,
      content: '',
      description: ''
    }];

    service.getCodingQuestions().subscribe((questions) => {
      expect(questions).toEqual(mockCodingQuestions);
    });

    const req = httpMock.expectOne(`${service.resultUrl}codingquestion?fullData=false`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCodingQuestions);
  });

  it('should execute code', () => {
    const mockCodeValue = 'console.log("Hello, World!");';
    const mockResponse = {};

    service.executeCode(mockCodeValue, 'java').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.javaExamUrl}/coding-question/run`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCodeValue);
    req.flush(mockResponse);
  });

  it('should submit code', () => {
    const mockRequestPayload = { };
    const mockResponse = { };

    service.submitCode(mockRequestPayload, 'java').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.javaExamUrl}/coding-question/submit`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequestPayload);
    req.flush(mockResponse);
  });

});

