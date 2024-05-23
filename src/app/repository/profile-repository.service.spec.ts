import { TestBed } from '@angular/core/testing';

import { ProfileRepositoryService } from './profile-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileRepositoryService', () => {
  let service: ProfileRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ProfileRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
