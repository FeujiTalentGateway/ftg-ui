import { TestBed } from '@angular/core/testing';

import { ChartDataRepositoryService } from './chart-data-repository.service';

describe('ChartDataRepositoryService', () => {
  let service: ChartDataRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
