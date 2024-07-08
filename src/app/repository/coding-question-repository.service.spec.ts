import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodingQuestionRepositoryService } from './coding-question-repository.service';
import { DataType } from '../models/coding.datatype.model';
import { CodingQuestion } from '../models/coding.question.model';
import { environment } from 'src/environments/environment';

describe('CodingQuestionRepositoryService', () => {
  let service: CodingQuestionRepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodingQuestionRepositoryService]
    });
    service = TestBed.inject(CodingQuestionRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data types from API via GET request', () => {
    const mockDataTypes: DataType[] = [
      {
        id: 1, commonDataType: 'String',
        isCollection: false
      },{
        id: 2, commonDataType: 'String',
        isCollection: false
      },
    ];

    spyOn(localStorage, 'getItem').and.returnValue('mock-token');

    service.getDataTypes().subscribe(dataTypes => {
      expect(dataTypes).toEqual(mockDataTypes);
    });

    const req = httpMock.expectOne(`${environment.adminUrl}datatype/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockDataTypes);
  });
   
});
