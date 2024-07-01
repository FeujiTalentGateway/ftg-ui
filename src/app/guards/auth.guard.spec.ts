import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { loginGuard, passwordChangeGuard, adminGuard, userGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

class MockAuthService {
  isLoggedin = jasmine.createSpy().and.returnValue(false);
  checkAdminRole = jasmine.createSpy().and.returnValue(false);
  checkUserRole = jasmine.createSpy().and.returnValue(false);
}

describe('Auth Guards', () => {
  let authService: MockAuthService;
  let router: Router;

  const executeGuard = (guard: CanActivateFn, ...guardParameters: [ActivatedRouteSnapshot, RouterStateSnapshot]) => 
      TestBed.runInInjectionContext(() => guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        Router,
        MatSnackBar,
      ],
    });

    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  describe('loginGuard', () => {
    it('should allow the authenticated user', () => {
      authService.isLoggedin.and.returnValue(true);
      const result = executeGuard(loginGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeTrue();
    });

    it('should redirect an unauthenticated user to login', () => {
      authService.isLoggedin.and.returnValue(false);
      const result = executeGuard(loginGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('main/login');
    });
  });

  describe('passwordChangeGuard', () => {
    it('should allow if password-token is present', () => {
      spyOn(localStorage, 'getItem').and.returnValue('some-token');
      const result = executeGuard(passwordChangeGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeTrue();
    });

    it('should redirect if password-token is not present', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const result = executeGuard(passwordChangeGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('main/forgot-password');
    });
  });

  describe('adminGuard', () => {
    it('should allow if user has admin role', () => {
      authService.checkAdminRole.and.returnValue(true);
      const result = executeGuard(adminGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeTrue();
    });

    it('should redirect to main home if user has no roles', () => {
      authService.checkAdminRole.and.returnValue(false);
      authService.checkUserRole.and.returnValue(false);
      const result = executeGuard(adminGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('main/home');
    });
  });

  describe('userGuard', () => {
    it('should allow if user has user role', () => {
      authService.checkUserRole.and.returnValue(true);
      const result = executeGuard(userGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeTrue();
    });

    it('should redirect to main home if user has no user role', () => {
      authService.checkUserRole.and.returnValue(false);
      const result = executeGuard(userGuard, {} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('main/home');
    });
  });
});
