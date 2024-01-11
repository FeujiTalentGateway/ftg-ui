import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth:AuthService,private router:Router,private snackbar:MatSnackBar) { }

  // Check if the user is authenticated.
  // Returns true if the user is authenticated (has a JWT token), otherwise false.
  checkAuthentication(): boolean {
    return this.isLoggedin();
  }

  // Get the JWT token from local storage if it exists.
  // Returns the JWT token as a string or "no jwt token" if it doesn't exist.
  getJwtToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token') + "";
    } else {
      return "no jwt token";
    }
  }

  // Check if the user is logged in by verifying the presence of a JWT token in local storage.
  // Returns true if the user is logged in, otherwise false.
  isLoggedin(): boolean {
    this.sessionExpired();
    return !!localStorage.getItem('token') && !this.auth.isTokenExpired()
  }

  sessionExpired() {
    if (this.auth.isTokenExpired()) {
      this.openSnackBar("session expired,Please login again", 'close');
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    }
  }

  // Display a snackbar with the given message and action
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: 'centered-snackbar', // Apply a custom CSS class
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}