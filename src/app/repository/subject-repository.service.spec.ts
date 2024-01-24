import { TestBed } from '@angular/core/testing';

import { SubjectRepositoryService } from './subject-repository.service';

describe('SubjectRepositoryService', () => {
  let service: SubjectRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
