import { TestBed } from '@angular/core/testing';

import { PaperRepositoryService } from './paper-repository.service';

describe('PaperRepositoryService', () => {
  let service: PaperRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
