import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChartDataRepositoryService } from './chart-data-repository.service';
import { SubjectQuestionCount } from '../models/subject-question-count.model';
import { ExamUserStats } from '../models/ExamUserStats.model';

describe('ChartDataRepositoryService', () => {
  let service: ChartDataRepositoryService;
  let httpMock: HttpTestingController;

  const mockSubjectQuestionCount: SubjectQuestionCount[] = [
    { subject: 'Java', questionCount: 20 },
    { subject: 'Angular', questionCount: 15 }
  ];

  const mockExamUserStats: ExamUserStats[] = [
    {
      examName: 'Exam 1', totalUsers: 100, completedUsers: 80,
      examCode: 'E1-Java'
    },
    {
      examName: 'Exam 2', totalUsers: 120, completedUsers: 90,
      examCode: 'E2-Angular'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChartDataRepositoryService]
    });
    service = TestBed.inject(ChartDataRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch question count by subject', () => {
    service.questionCountBySubject().subscribe((data) => {
      expect(data).toEqual(mockSubjectQuestionCount);
    });

    const req = httpMock.expectOne(`${service.baseurl}/question-count-by-subject`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubjectQuestionCount);
  });

  it('should fetch exam user stats', () => {
    service.getExamUserStats().subscribe((data) => {
      expect(data).toEqual(mockExamUserStats);
    });

    const req = httpMock.expectOne(`${service.baseurl}/exams-user-stats`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExamUserStats);
  });
});
