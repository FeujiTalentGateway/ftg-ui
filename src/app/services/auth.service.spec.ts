import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { SnackBarService } from './snack-bar.service';
import { UserdetailsService } from './userdetails.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../models/user.model';
import { MatDialogModule } from '@angular/material/dialog';

describe('AuthService', () => {
  let service: AuthService;
  let jwtHelperService: JwtHelperService;
  let httpMock: HttpTestingController;
  let snackBarService: SnackBarService;
  let ngxUiLoaderService: NgxUiLoaderService;
  let authRepo: AuthRepositoryService;

  const mockToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInN1YiI6ImRlZmF1bHR1c2VyIiwiaWF0IjoxNzE4NjA0NzEyLCJleHAiOjE3MTg2MTkxMTJ9.1IQ-SCS2GEcaRpgsv1JYHQsKWd5CqUfgi705clKjwIQ';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatDialogModule
      ],
      providers: [
        AuthService,
        SnackBarService,
        AuthRepositoryService,
        UserdetailsService,
        NgxUiLoaderService,
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      ],
    });
    service = TestBed.inject(AuthService);
    jwtHelperService = TestBed.inject(JwtHelperService);
    snackBarService = TestBed.inject(SnackBarService);
    httpMock = TestBed.inject(HttpTestingController);
    ngxUiLoaderService = TestBed.inject(NgxUiLoaderService);
    authRepo = TestBed.inject(AuthRepositoryService);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
    sessionStorage.clear();
  });

  const mockGoogleUser = {
    id: 'google-id',
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set JWT token', () => {
    service.setJwtToken(mockToken);
    expect(localStorage.getItem(service.authTokenKey)).toBe(mockToken);
  });

  it('should remove JWT token and role', () => {
    localStorage.setItem(service.authTokenKey, 'test-token');
    localStorage.setItem('role', 'USER');
    service.removeJwtToken();
    expect(localStorage.getItem(service.authTokenKey)).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should decode JWT token', () => {
    const decodedMockToken = {
      authorities: [{ authority: 'ADMIN' }],
      sub: 'defaultuser',
      iat: 1718604712,
      exp: 1718619112,
    };
    spyOn(jwtHelperService, 'decodeToken').and.returnValue(decodedMockToken);
    localStorage.setItem(service.authTokenKey, mockToken);
    const decodedToken = service.decodedToken();
    expect(decodedToken).toEqual(decodedMockToken);
  });

  it('should handle error while decoding JWT token', () => {
    const token = 'invalid-token';
    spyOn(jwtHelperService, 'decodeToken').and.throwError('Invalid token');
    localStorage.setItem(service.authTokenKey, token);
    const decodedToken = service.decodedToken();
    expect(decodedToken).toBeUndefined();
  });

  it('should get JWT token from local storage', () => {
    const token = 'test-token';
    localStorage.setItem(service.authTokenKey, token);
    expect(service.getJwtToken()).toBe(token);
    localStorage.removeItem(service.authTokenKey);
    expect(service.getJwtToken()).toBe('no jwt token');
  });

  it('should check if the user is logged in', () => {
    localStorage.setItem(service.authTokenKey, mockToken);
    expect(service.isLoggedin()).toBeFalse();
    localStorage.removeItem(service.authTokenKey);
    expect(service.isLoggedin()).toBeFalse();
  });

  it('should handle session expiration', () => {
    spyOn(service, 'isTokenExpired').and.returnValue(true);
    spyOn(snackBarService, 'openSnackBarSuccessMessage');
    localStorage.setItem(service.authTokenKey, 'test-token');
    service.sessionExpired();
    expect(localStorage.getItem(service.authTokenKey)).toBeNull();
    expect(snackBarService.openSnackBarSuccessMessage).toHaveBeenCalledWith(
      'Session expired. Please login again',
      'close'
    );
  });

  it('should check for admin role', () => {
    const tokenPayload = { authorities: [{ authority: 'ADMIN' }] };
    spyOn(service, 'decodedToken').and.returnValue(tokenPayload);
    expect(service.checkAdminRole()).toBeTrue();
    tokenPayload.authorities = [{ authority: 'USER' }];
    expect(service.checkAdminRole()).toBeFalse();
  });
  it('should check for user role', () => {
    const tokenPayload = { authorities: [{ authority: 'USER' }] };
    spyOn(service, 'decodedToken').and.returnValue(tokenPayload);
    expect(service.checkUserRole()).toBeTrue();
    tokenPayload.authorities = [{ authority: 'ADMIN' }];
    expect(service.checkUserRole()).toBeFalse();
  });
  it('should logout and clear storage', () => {
    localStorage.setItem(service.authTokenKey, 'test-token');
    sessionStorage.setItem('test-key', 'test-value');
    service.logout();
    expect(localStorage.getItem(service.authTokenKey)).toBeNull();
    expect(sessionStorage.getItem('test-key')).toBeNull();
  });

  it('should handle error during Google login', fakeAsync(() => {
    const mockSnackBarErrorSpy = spyOn(snackBarService, 'openSnackBarForError');
    const mockNgxLoaderStopSpy = spyOn(ngxUiLoaderService, 'stop');

    service.loginWithGoogle(mockGoogleUser);

    const req = httpMock.expectOne(
      'http://localhost:8092/registration/googleregister'
    );
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));

    tick();

    expect(mockNgxLoaderStopSpy).toHaveBeenCalled();
    expect(mockSnackBarErrorSpy).toHaveBeenCalledWith(
      'Something went wrong',
      'Close'
    );
  }));

  it('should handle 400 error during Google login', fakeAsync(() => {
    const mockSnackBarErrorSpy = spyOn(snackBarService, 'openSnackBarForError');
    const mockNgxLoaderStopSpy = spyOn(ngxUiLoaderService, 'stop');

    service.loginWithGoogle(mockGoogleUser);

    const req = httpMock.expectOne(
      'http://localhost:8092/registration/googleregister'
    );
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('400 error'), {
      status: 400,
      statusText: 'Bad Request',
    });

    tick();

    expect(mockNgxLoaderStopSpy).toHaveBeenCalled();
    expect(mockSnackBarErrorSpy).toHaveBeenCalledWith('', 'Close');
  }));
  it('should call authRepo.register(user) when registering a user', () => {
    const mockUser: User = {
      firstName: 'Test',
      lastName: 'User',
      userName: 'testuser',
      emailId: 'testuser@example.com',
      password: 'password123',
    };

    spyOn(authRepo, 'register').and.callThrough();
    spyOn(ngxUiLoaderService, 'start');
    spyOn(ngxUiLoaderService, 'stop');
    spyOn(snackBarService, 'openSnackBar');
    spyOn(snackBarService, 'openSnackBarSuccessMessage');
    spyOn(snackBarService, 'openSnackBarForError');

    service.register(mockUser);

    expect(ngxUiLoaderService.start).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8092/registration/register'
    );
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'User successfully registered' });

    expect(authRepo.register).toHaveBeenCalledWith(mockUser);
    expect(ngxUiLoaderService.stop).toHaveBeenCalledTimes(2);
  });

  it('should handle error responses correctly when registering a user', fakeAsync(() => {
    const mockUser: User = {
      firstName: 'Test',
      lastName: 'User',
      userName: 'testuser',
      emailId: 'testuser@example.com',
      password: 'password123',
    };
    const errorResponse = { error: { message: 'Username already exists' } };

    spyOn(authRepo, 'register').and.callThrough();
    spyOn(ngxUiLoaderService, 'start');
    spyOn(ngxUiLoaderService, 'stop');
    spyOn(snackBarService, 'openSnackBar');
    spyOn(snackBarService, 'openSnackBarSuccessMessage');
    spyOn(snackBarService, 'openSnackBarForError');

    service.register(mockUser);

    expect(ngxUiLoaderService.start).toHaveBeenCalled();

    const req = httpMock.expectOne(
      'http://localhost:8092/registration/register'
    );
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });

    tick();

    expect(authRepo.register).toHaveBeenCalledWith(mockUser);

    expect(ngxUiLoaderService.stop).toHaveBeenCalledTimes(1);
  }));
});
