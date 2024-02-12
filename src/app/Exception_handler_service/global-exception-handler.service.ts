import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalExceptionHandlerService {
  constructor(private router: Router) {}

  httpErrorHandler(error: HttpErrorResponse) {
    if (error.status == 404) {
      this.router.navigateByUrl('/error/404');
    } else if (error.status == 401) {
      this.router.navigateByUrl('/error/401');
    } else if (error.status == 403) {
      this.router.navigateByUrl('/error/403');
    } else if (error.status == 500) {
      this.router.navigateByUrl('/error/500');
    } else if (error.status == 409) {
      this.router.navigateByUrl('/error/409');
    } else {
      this.router.navigateByUrl('/error/global');
    }
  }
}
