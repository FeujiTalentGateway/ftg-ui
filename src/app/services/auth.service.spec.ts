import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SnackBarService } from './snack-bar.service';
import { UserdetailsService } from './userdetails.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthService', () => {
  let service: AuthService;
  let jwtHelperService: JwtHelperService;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
  let snackBarService: SnackBarService;

  const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInN1YiI6ImRlZmF1bHR1c2VyIiwiaWF0IjoxNzE4NjA0NzEyLCJleHAiOjE3MTg2MTkxMTJ9.1IQ-SCS2GEcaRpgsv1JYHQsKWd5CqUfgi705clKjwIQ';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule,NoopAnimationsModule],
      providers: [
        AuthService,
        SnackBarService,
        AuthRepositoryService,
        UserdetailsService,
        NgxUiLoaderService,
        JwtHelperService,
        { provide: Router, useValue: routerSpy },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      ]
    });
    service = TestBed.inject(AuthService);
    jwtHelperService = TestBed.inject(JwtHelperService);
    snackBarService = TestBed.inject(SnackBarService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set JWT token', () => {
    const token = 'test-token';
    service.setJwtToken(token);
    expect(localStorage.getItem(service.authTokenKey)).toBe(token);
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
      exp: 1718619112
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
    expect(service.isLoggedin()).toBeTrue();
    localStorage.removeItem(service.authTokenKey);
    expect(service.isLoggedin()).toBeFalse();
  });

  it('should handle session expiration', () => {
    spyOn(service, 'isTokenExpired').and.returnValue(true);
    spyOn(snackBarService, 'openSnackBarSuccessMessage');
    localStorage.setItem(service.authTokenKey, 'test-token');
    service.sessionExpired();
    expect(localStorage.getItem(service.authTokenKey)).toBeNull();
    expect(snackBarService.openSnackBarSuccessMessage).toHaveBeenCalledWith('Session expired. Please login again', 'close');
    // Uncomment the following line if you want to test navigation as well
    // expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('main/login');
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
});
