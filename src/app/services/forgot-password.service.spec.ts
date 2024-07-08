import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordService } from './forgot-password.service';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { Otp } from '../models/otpDto.model';
import { FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({ template: '' })
class DummyComponent {}

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;
  let httpMock: HttpTestingController;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([
          { path: 'main/login', component: DummyComponent },
          { path: 'main/reset-password', component: DummyComponent },
        ]),
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        ForgotPasswordService,
        AuthRepositoryService,
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      declarations: [DummyComponent]
    });

    service = TestBed.inject(ForgotPasswordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send OTP to email', () => {
    const email = 'test@example.com';
    const response = new HttpResponse({ status: 200, body: { otp: '123456' } });
    spyOn(service, 'openOtpVerifyComponent').and.callThrough();
    spyOn(service, 'openSnackBar').and.callThrough();

    service.sendOtpToEmail(email);

    const req = httpMock.expectOne(`http://localhost:8092/account/generate-otp/${email}`);
    expect(req.request.method).toBe('GET');
    req.event(response);

    expect(sessionStorage.getItem('password-token')).toBe('123456');
    expect(sessionStorage.getItem('email')).toBe(email);
    expect(service.openOtpVerifyComponent).toHaveBeenCalled();
  });
  it('should set new password for forgot password request', () => {
    const form = {
      value: {
        password: 'newpassword'
      }
    } as FormGroup;
    const response = { message: 'password changed' };
    spyOn(service, 'openSnackBar').and.callThrough();
    spyOn(service.route, 'navigate').and.callThrough();

    sessionStorage.setItem('otp', '123456');
    sessionStorage.setItem('email', 'test@example.com');

    service.setPasswordRequestForForgotPassword(form);

    const req = httpMock.expectOne((req) => req.url.includes('forgot-password') && req.method === 'PUT');
    expect(req.request.method).toBe('PUT');
    req.flush(response);

    expect(service.openSnackBar).toHaveBeenCalledWith('Password changed successfully', 'Close');
    // expect(service.route.navigate).toHaveBeenCalledWith(['/main/login']);
  });
});
