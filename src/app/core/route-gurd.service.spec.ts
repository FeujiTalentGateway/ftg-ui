import { TestBed } from '@angular/core/testing';

import { RouteGurdService } from './route-gurd.service';

describe('RouteGurdService', () => {
  let service: RouteGurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
