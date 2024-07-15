import { TestBed } from '@angular/core/testing';
import { GoogleLoginService } from './google-login.service';
import { AuthService } from './auth.service';
import { SnackBarService } from './snack-bar.service';
import { GoogleUser } from '../models/google-user.model';

describe('GoogleLoginService', () => {
  let service: GoogleLoginService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(() => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['loginWithGoogle']);
    const snackBarServiceSpyObj = jasmine.createSpyObj('SnackBarService', ['openSnackBarForError']);

    TestBed.configureTestingModule({
      providers: [
        GoogleLoginService,
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: SnackBarService, useValue: snackBarServiceSpyObj }
      ]
    });

    service = TestBed.inject(GoogleLoginService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBarServiceSpy = TestBed.inject(SnackBarService) as jasmine.SpyObj<SnackBarService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('should load Google Sign-In script', (done: DoneFn) => {
      service.loadGoogleSignInScript().then(() => {
        expect(document.querySelector('script[src="https://accounts.google.com/gsi/client"]')).toBeTruthy();
        done();
      });
    });

    it('should initialize Google Sign-In button', () => {
      const callback = jasmine.createSpy('callback');
      const initializeSpy = jasmine.createSpy('initialize');
      const renderButtonSpy = jasmine.createSpy('renderButton');

      (window as any).google = {
        accounts: {
          id: {
            initialize: initializeSpy,
            renderButton: renderButtonSpy
          }
        }
      };

      const element = document.createElement('div');
      element.id = 'google-btn';
      document.body.appendChild(element);

      service.initializeGoogleSignInButton(callback);

      expect(initializeSpy).toHaveBeenCalledWith({
        client_id: '842949696777-b3duehfjqha22vsqefbp2ql8lnisgeaa.apps.googleusercontent.com',
        callback: callback
      });

      expect(renderButtonSpy).toHaveBeenCalledWith(element, {
        theme: 'filled_blue',
        size: 'large',
        shape: 'circle',
        width: '150'
      });

      document.body.removeChild(element);
    });

    it('should handle valid Google credential response', () => {
      const response = { credential: 'valid.token.here' };
      const decodedToken = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        sub: '1234567890',
        picture: 'http://example.com/johndoe.jpg',
        email_verified: true
      };
      spyOn(service, 'decodeToken').and.returnValue({
        name: decodedToken.name,
        emailId: decodedToken.email,
        password: btoa(decodedToken.sub),
        isActive: decodedToken.email_verified
      });

      service.handleGoogleCredentialResponse(response);

      expect(service.decodeToken).toHaveBeenCalledWith(response.credential);
      expect(authServiceSpy.loginWithGoogle).toHaveBeenCalledWith({
        name: decodedToken.name,
        emailId: decodedToken.email,
        password: btoa(decodedToken.sub),
        isActive: decodedToken.email_verified
      } as GoogleUser);
    });

    it('should handle invalid Google credential response', () => {
      service.handleGoogleCredentialResponse(null);

      expect(snackBarServiceSpy.openSnackBarForError).toHaveBeenCalledWith('something went wrong, please try again');
    });

    it('should decode token and return GoogleUser', () => {
      const token = 'header.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInBpY3R1cmUiOiJodHRwOi8vZXhhbXBsZS5jb20vam9obmRvZS5qcGciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0.signature';
      const expectedUser: GoogleUser = {
        name: 'John Doe',
        emailId: 'john.doe@example.com',
        password: btoa('1234567890'),
        isActive: true
      };

      const decodedUser = service.decodeToken(token);

      expect(decodedUser).toEqual(expectedUser);
      expect(localStorage.getItem('profilePictureUrl')).toBe('http://example.com/johndoe.jpg');
    });
  });