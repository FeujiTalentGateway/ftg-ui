import { TestBed } from '@angular/core/testing';

import { ForgotPasswordService } from './forgot-password.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,MatDialogModule]
    });
    service = TestBed.inject(ForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
