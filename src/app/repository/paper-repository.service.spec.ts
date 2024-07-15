import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaperRepositoryService } from './paper-repository.service';
import { environment } from 'src/environments/environment';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
import { Subject } from '../models/subject';

describe('PaperRepositoryService', () => {
  let service: PaperRepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaperRepositoryService]
    });
    service = TestBed.inject(PaperRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all papers from API via GET request', () => {
    const mockPapers: Paper[] = [
      {
        id: 1, name: 'Paper 1', questions: [],
        active: false
      },
      {
        id: 2, name: 'Paper 2', questions: [],
        active: false
      },
    ];

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.getAllPapers().subscribe(papers => {
      expect(papers).toEqual(mockPapers);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}paper/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockPapers);
  });

  it('should save a paper via POST request', () => {
    const mockPaper: Paper =  {
      id: 1, name: 'Paper 1', questions: [],
      active: false
    };

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.savePaper(mockPaper).subscribe(paper => {
      expect(paper).toEqual(mockPaper);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}paper/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    expect(req.request.body).toEqual(mockPaper);
    req.flush(mockPaper);
  });

  it('should update a paper via PUT request', () => {
    const mockPaper: Paper =  {
      id: 1, name: 'Paper 1', questions: [],
      active: false
    };

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.updatePaper(mockPaper).subscribe(paper => {
      expect(paper).toEqual(mockPaper);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}paper/`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    expect(req.request.body).toEqual(mockPaper);
    req.flush(mockPaper);
  });

  it('should fetch a paper by ID via GET request', () => {
    const mockPaper: Paper =  {
      id: 1, name: 'Paper 1', questions: [],
      active: false
    };

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.getPaperById(1).subscribe(paper => {
      expect(paper).toEqual(mockPaper);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}paper/1`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockPaper);
  });

  it('should fetch all subjects from API via GET request', () => {
    const mockSubjects: Subject[] = [
      {
        id: 1, name: 'Math',
        active: false
      },
      {
        id: 2, name: 'Science',
        active: false
      },
    ];

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.getAllSubjects().subscribe(subjects => {
      expect(subjects).toEqual(mockSubjects);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}subject/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockSubjects);
  });

  it('should fetch all questions from API via GET request', () => {
    const mockQuestions: Question[] = [
      {
        id: 1, content: 'What is 2+2?', options: [{
          id: 1, optionName: "London",
          active: false
        }],
        active: false,
        difficultyLevel: 0,
        questionType: '',
        subject: {id:1,  name: 'Java',
          active: true},
        rightOptions: [],
        isCodeSnippet: false,
        codeSnippet: ''
      },
    ];

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.getAllQuestions().subscribe(questions => {
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}question/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockQuestions);
  });
});
