import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getJwtToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header when jwtToken exists and URL is not excluded', () => {
    const jwtToken = 'dummyJwtToken';
    authService.getJwtToken.and.returnValue(jwtToken);

    const excludedUrls = ['/login', '/register'];
    const testUrl = 'https://example.com/api/data';

    httpClient.get(testUrl).subscribe();

    const httpRequest = httpTestingController.expectOne(testUrl);

    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual(
      `Bearer ${jwtToken}`
    );
  });

  it('should not add Authorization header when jwtToken is absent', () => {
    // authService.getJwtToken.and.returnValue('null');

    const testUrl = 'https://example.com/api/data';

    httpClient.get(testUrl).subscribe();

    const httpRequest = httpTestingController.expectOne(testUrl);

    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });

  it('should not add Authorization header for excluded URLs', () => {
    const jwtToken = 'dummyJwtToken';
    authService.getJwtToken.and.returnValue(jwtToken);

    const excludedUrls = ['/login', '/register', '/forgotpassword/123'];
    const testUrls = [
      'https://example.com/login',
      'https://example.com/register',
      'https://example.com/forgotpassword/123',
    ];

    testUrls.forEach((url) => {
      httpClient.get(url).subscribe();

      const httpRequest = httpTestingController.expectOne(url);

      expect(httpRequest.request.headers.has('Authorization')).toBe(false);
    });
  });
});
