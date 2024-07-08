import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileRepositoryService } from './profile-repository.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

describe('ProfileRepositoryService', () => {
  let service: ProfileRepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileRepositoryService],
    });

    service = TestBed.inject(ProfileRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user profile data', () => {
    const mockUser: User = {id_i:1 };

    service.getProfile().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}profile`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

});

