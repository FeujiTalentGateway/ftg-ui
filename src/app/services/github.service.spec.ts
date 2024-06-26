import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserdetailsService } from './userdetails.service';
import { SnackBarService } from './snack-bar.service';
import { AuthService } from './auth.service';
import { GithubService } from './github.service';
import { environment } from 'src/environments/environment';
import { GITHUB_CLIENT_ID, SOMETHING_WENT_WRONG, SUCCESSFULLY_LOGGED_IN } from '../utils/CONSTANT/String_constant';
import { GITHUB_REGISTRATION_URL } from '../utils/CONSTANT/Api_constant';
import { of, throwError } from 'rxjs';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let ngxUiLoaderServiceSpy: jasmine.SpyObj<NgxUiLoaderService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userdetailsServiceSpy: jasmine.SpyObj<UserdetailsService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['setJwtToken', 'decodedToken']);
    const snackBarSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBarSuccessMessage', 'openSnackBarForError']);
    const ngxUiLoaderSpy = jasmine.createSpyObj('NgxUiLoaderService', ['start', 'stop']);
    const routerNavSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userdetailsSpy = jasmine.createSpyObj('UserdetailsService', ['setUserNameFromToken', 'setRoleFromToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GithubService,
        { provide: AuthService, useValue: authSpy },
        { provide: SnackBarService, useValue: snackBarSpy },
        { provide: NgxUiLoaderService, useValue: ngxUiLoaderSpy },
        { provide: Router, useValue: routerNavSpy },
        { provide: UserdetailsService, useValue: userdetailsSpy },
      ],
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBarServiceSpy = TestBed.inject(SnackBarService) as jasmine.SpyObj<SnackBarService>;
    ngxUiLoaderServiceSpy = TestBed.inject(NgxUiLoaderService) as jasmine.SpyObj<NgxUiLoaderService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    userdetailsServiceSpy = TestBed.inject(UserdetailsService) as jasmine.SpyObj<UserdetailsService>;
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should handle GitHub callback and navigate based on role', () => {
    const mockResponse = {
      message: SUCCESSFULLY_LOGGED_IN,
      token: 'mockToken',
      authorities: [{ authority: 'USER' }],
    };
    authServiceSpy.decodedToken.and.returnValue({
      sub: 'mockUser',
      authorities: [{ authority: 'USER' }],
    });

    service.handleGitHubCallback('mockCode');
    
    const req = httpMock.expectOne(environment.pythonUrl + GITHUB_REGISTRATION_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    
    expect(ngxUiLoaderServiceSpy.start).toHaveBeenCalled();
    expect(ngxUiLoaderServiceSpy.stop).toHaveBeenCalled();
    expect(snackBarServiceSpy.openSnackBarSuccessMessage).toHaveBeenCalledWith(SUCCESSFULLY_LOGGED_IN, 'Close');
    expect(authServiceSpy.setJwtToken).toHaveBeenCalledWith('mockToken');
    expect(userdetailsServiceSpy.setUserNameFromToken).toHaveBeenCalledWith('mockUser');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/exam/exam-code');
  });

  it('should handle error during GitHub callback', () => {
    service.handleGitHubCallback('mockCode');
    
    const req = httpMock.expectOne(environment.pythonUrl + GITHUB_REGISTRATION_URL);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Error' }, { status: 400, statusText: 'Bad Request' });
    
    expect(ngxUiLoaderServiceSpy.start).toHaveBeenCalled();
    expect(ngxUiLoaderServiceSpy.stop).toHaveBeenCalled();
    expect(snackBarServiceSpy.openSnackBarForError).toHaveBeenCalledWith('Error', 'Close');
  });
});
