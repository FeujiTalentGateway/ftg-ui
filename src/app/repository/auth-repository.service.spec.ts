import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthRepositoryService } from './auth-repository.service';
import { environment } from 'src/environments/environment';
import { UserLoginModel } from '../models/user-login.model';
import { User } from '../models/user.model';
import { GoogleUser } from '../models/google-user.model';
import { Otp } from '../models/otpDto.model';

describe('AuthRepositoryService', () => {
  let service: AuthRepositoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthRepositoryService]
    });
    service = TestBed.inject(AuthRepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser = { userName: 'testuser', emailId: 'test@example.com', password: 'password123' };
    const mockResponse = { message: 'User successfully registered' };

    service.register(mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}registration/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should login a user', () => {
    const mockLogin: UserLoginModel = { userName: 'defaultuser', password: 'password123' };
    const mockResponse = { token: 'fake-jwt-token' };

    service.login(mockLogin).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send OTP to email', () => {
    const email = 'test@example.com';
    const mockResponse = { message: 'OTP sent' };

    service.sendOtpToEmail(email).subscribe(response => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}account/generate-otp/${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });

  it('should get user by role name', () => {
    const roleName = 'admin';
    const mockUsers: User[] = [{ userName: 'adminuser', emailId: 'admin@example.com' }];

    localStorage.setItem(environment.authTokenKey, 'fake-jwt-token');

    service.getUserByRoleName(roleName).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user/role/${roleName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should change password', () => {
    const mockRequest = { oldPassword: 'oldpassword123', newPassword: 'newpassword123' };
    const mockResponse = { message: 'Password changed successfully' };

    service.changePassword(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user/changePassword`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });
  
  it('should login with Google', () => {
    const mockGoogleUser: GoogleUser =  {
      name: 'John Doe',
      emailId: 'john.doe@example.com',
      password:'rsgfy8u4ew',
      isActive:true,
    };;
    const mockResponse = { token: 'fake-jwt-token' };

    service.loginWithGoogle(mockGoogleUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}registration/googleregister`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should verify OTP', () => {
    const mockOtp: Otp = { otp: '123456', email: 'test@example.com' };
    const mockResponse = { message: 'OTP verified' };

    service.verifyOtp(mockOtp).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}account/verify-account`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
