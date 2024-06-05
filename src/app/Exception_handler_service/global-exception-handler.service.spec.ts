import { TestBed } from '@angular/core/testing';

import { GlobalExceptionHandlerService } from './global-exception-handler.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlobalExceptionHandlerService', () => {
  let service: GlobalExceptionHandlerService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalExceptionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    service = new GlobalExceptionHandlerService(router);
  });

  it('should navigate to /error/404 for 404 status', () => {
    const error = new HttpErrorResponse({ status: 404 });
    service.httpErrorHandler(error);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/error/404');
  });

  it('should navigate to /error/401 for 401 status', () => {
    const error = new HttpErrorResponse({ status: 401 });
    service.httpErrorHandler(error);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/error/401');
  });

  it('should navigate to /error/403 for 403 status', () => {
    const error = new HttpErrorResponse({ status: 403 });
    service.httpErrorHandler(error);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/error/403');
  });

  it('should navigate to /error/500 for 500 status', () => {
    const error = new HttpErrorResponse({ status: 500 });
    service.httpErrorHandler(error);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/error/500');
  });

  it('should navigate to /error/409 for 409 status', () => {
    const error = new HttpErrorResponse({ status: 409 });
    service.httpErrorHandler(error);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/error/409');
  });

  it('should navigate to /error/global for other status codes', () => {
    const error = new HttpErrorResponse({ status: 530 });
    service.httpErrorHandler(error);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/error/global');
  });
  
});
