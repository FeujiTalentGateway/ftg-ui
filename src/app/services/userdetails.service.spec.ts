/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserdetailsService } from './userdetails.service';

describe('Service: Userdetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserdetailsService]
    });
  });

  it('should ...', inject([UserdetailsService], (service: UserdetailsService) => {
    expect(service).toBeTruthy();
  }));
});
