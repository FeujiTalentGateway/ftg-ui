import { TestBed } from '@angular/core/testing';
import { AuthRepositoryService } from './auth-repository.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthRepositoryService', () => {
  let service: AuthRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(AuthRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
