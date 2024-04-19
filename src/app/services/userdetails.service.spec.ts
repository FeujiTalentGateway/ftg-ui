/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserdetailsService } from './userdetails.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Userdetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],

      providers: [UserdetailsService],
    });
  });

  it('should ...', inject(
    [UserdetailsService],
    (service: UserdetailsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
