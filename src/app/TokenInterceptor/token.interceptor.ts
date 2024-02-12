import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authGuard: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('inde the token');

    const jwtToken = this.authGuard.getJwtToken();

    // Define an array of URLs to exclude from adding the Authorization header
    const excludeUrls = ['/login', '/register'];

    // Check if the request URL is in the excludeUrls array
    if (
      jwtToken &&
      !excludeUrls.some((url) => {
        return (
          request.url.endsWith(url) || request.url.includes('/forgotpassword/')
        );
      })
    ) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` },
      });
    }

    return next.handle(request);
  }
}
