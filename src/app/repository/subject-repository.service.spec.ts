import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubjectRepositoryService } from './subject-repository.service';
import { Subject } from '../models/subject';
import { environment } from 'src/environments/environment';

describe('SubjectRepositoryService', () => {
  let service: SubjectRepositoryService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.adminUrl;
  const authTokenKey = environment.authTokenKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubjectRepositoryService],
    });
    service = TestBed.inject(SubjectRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all subjects by active status', () => {
    const dummySubjects: Subject[] = [
      { id: 1, name: 'Math', active: true },
      { id: 2, name: 'Science', active: true },
    ];
    localStorage.setItem(authTokenKey, 'fake-token');

    service.getAllSubjectsByActiveStatus(true).subscribe((subjects) => {
      expect(subjects.length).toBe(2);
      expect(subjects).toEqual(dummySubjects);
    });

    const req = httpMock.expectOne(`${baseUrl}subject/active-status/true`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(dummySubjects);
  });

  it('should get all subjects', () => {
    const dummySubjects: Subject[] = [
      { id: 1, name: 'Math', active: true },
      { id: 2, name: 'Science', active: true },
    ];
    localStorage.setItem(authTokenKey, 'fake-token');

    service.getAllSubjects().subscribe((subjects) => {
      expect(subjects.length).toBe(2);
      expect(subjects).toEqual(dummySubjects);
    });

    const req = httpMock.expectOne(`${baseUrl}subject/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(dummySubjects);
  });

  it('should delete a subject', () => {
    localStorage.setItem(authTokenKey, 'fake-token');
    const subjectId = 1;

    service.deleteSubject(subjectId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}subject/deactivate/${subjectId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush({});
  });

  it('should get subject by id', () => {
    const dummyQuestion = { id: 1, text: 'What is 2+2?' } as any; // Replace with actual Question type
    localStorage.setItem(authTokenKey, 'fake-token');
    const subjectId = 1;

    service.getSubjectById(subjectId).subscribe((question) => {
      expect(question).toEqual(dummyQuestion);
    });

    const req = httpMock.expectOne(`${baseUrl}subject/${subjectId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(dummyQuestion);
  });

  it('should add a subject', () => {
    const newSubject: Subject = { id: 3, name: 'History', active: true };
    localStorage.setItem(authTokenKey, 'fake-token');

    service.addSubject(newSubject).subscribe((response) => {
      expect(response).toEqual(newSubject);
    });

    const req = httpMock.expectOne(`${baseUrl}subject/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    expect(req.request.body).toEqual(newSubject);
    req.flush(newSubject);
  });

  it('should edit a subject', () => {
    const updatedSubject: Subject = { id: 1, name: 'Math', active: false };
    localStorage.setItem(authTokenKey, 'fake-token');

    service.editSubject(updatedSubject).subscribe((response) => {
      expect(response).toEqual(updatedSubject);
    });

    const req = httpMock.expectOne(`${baseUrl}subject/`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    expect(req.request.body).toEqual(updatedSubject);
    req.flush(updatedSubject);
  });

  it('should activate a subject', () => {
    localStorage.setItem(authTokenKey, 'fake-token');
    const subjectId = 1;

    service.activateSubject(subjectId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}subject/activate/${subjectId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush({});
  });

  it('should handle 404 error gracefully', () => {
    localStorage.setItem(authTokenKey, 'fake-token');
    const subjectId = 999;

    service.getSubjectById(subjectId).subscribe(
      () => fail('expected a 404 error'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne(`${baseUrl}subject/${subjectId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush('Subject not found', { status: 404, statusText: 'Not Found' });
  });
});
