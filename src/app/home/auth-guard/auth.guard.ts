import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
@Injectable({
    providedIn: "root",
  })
export class AuthGuard{
    constructor(private authService: AuthGuardService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Check if the user is authenticated
      if (this.authService.checkAuthentication()) {
        // User is authenticated, allow access
        return true;
      } else {
        // User is not authenticated, redirect to the login page
        this.router.navigate(["/login"]);
        return false;
      }
    }
  }
