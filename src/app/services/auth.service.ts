import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { Router } from '@angular/router';
import { UserdetailsService } from './userdetails.service';
import { FormGroup } from '@angular/forms';
import { UserLoginModel } from '../models/user-login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';
import { OtpVerificationComponent } from '../home/otp-verification/otp-verification.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { ResetPassowrdComponent } from '../home/reset-passowrd/reset-passowrd.component';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  dialogRef: any;
  roles: any[] = [];
  constructor(
    private authRepo: AuthRepositoryService,
    private snackBar: MatSnackBar,
    private route: Router,
    private userDetails: UserdetailsService
  ) {}

  // Handle user registration based on form data

  register(user: User) {
    // Send the registration data to the server and handle the response
    this.authRepo.register(user).subscribe({
      next: (response: any) => {
        const responseMessage: string = response.message;
        console.log(responseMessage);
        this.openSnackBar(response.message, 'Close');
        if (responseMessage.includes('User successfully registered with')) {
          this.openSnackBar(responseMessage, 'Close');
          this.route.navigateByUrl('main/login');
        }
      },
      error: (error: any) => {
        const responseMessage: string = error.error.message;
        if (responseMessage == 'Username already exists') {
          this.openSnackBar(
            "Username '" + user.userName + "' already exists",
            'Close'
          );
        } else if (responseMessage == 'Email already exists') {
          this.openSnackBar(
            "Email '" + user.emailId + "' already exists",
            'Close'
          );
        }
        this.openSnackBar(responseMessage, 'Close');
      },
    });
  }
  login(loginData: FormGroup) {
    localStorage.removeItem('Email-Token');
    // Create a new instance of LoginUser with the form data
    const user: UserLoginModel = {
      userName: loginData.value.userName,
      password: btoa(loginData.value.password),
    };

    this.authRepo.login(user).subscribe({
      next: (response: any) => {
        console.log(response.message);
        if (response.message == 'Successfully logged in') {
          // this.openSnackBar('Login successfully', 'Close');
          this.setJwtToken(response.token);
          this.decodedToken();
          localStorage.setItem('userName', this.userPayload.sub);
          this.userDetails.setUserNameFromToken(this.userPayload.sub);
          this.userDetails.setRoleFromToken(this.userPayload.authorities);
          let roles: string[] = this.userPayload.authorities.map(
            (e: { authority: any }) => e.authority
          );
          sessionStorage.setItem(
            'roles',
            this.userPayload.authorities.map(
              (e: { authority: any }) => e.authority
            )
          );
          if (roles.includes('USER')) {
            this.route.navigateByUrl('/user/exam/exam-code');
          } else {
            this.route.navigateByUrl('/admin/home');
          }
        }
      },
      error: (error: any) => {
        console.log(error.error.message);
        console.log(error.status);
        if (error.status === 400) {
          console.log(error.error.message);
          this.openSnackBar(error.error.message, 'Close');
        } else {
          this.openSnackBar('Something went wrong', 'Close');
        }
      },
    });
  }
  setJwtToken(token: any) {
    localStorage.setItem('token', token);
  }
  removeJwtToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const jwtToken = localStorage.getItem('token') || '';
    try {
      this.userPayload = jwtHelper.decodeToken(jwtToken);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
    console.log('inside decode ' + this.userPayload.authorities);
    return this.userPayload;
  }

  // Check if the JWT token has expired
  isTokenExpired() {
    const jwtHelper = new JwtHelperService();
    const jwtToken = localStorage.getItem('token')!;
    return jwtHelper.isTokenExpired(jwtToken);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'centered-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  templogin(loginData: FormGroup) {
    if (loginData) {
      console.log(loginData);

      localStorage.setItem('role', loginData.value.userName);
      this.route.navigateByUrl('/user/home');
    }
  }

  // Get the JWT token from local storage if it exists.
  // Returns the JWT token as a string or "no jwt token" if it doesn't exist.
  getJwtToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token') + '';
    } else {
      return 'no jwt token';
    }
  }

  // Check if the user is logged in by verifying the presence of a JWT token in local storage.
  // Returns true if the user is logged in, otherwise false.
  isLoggedin(): boolean {
    this.sessionExpired();
    return !!localStorage.getItem('token');
  }

  sessionExpired() {
    if (this.isTokenExpired()) {
      localStorage.removeItem('token');
      this.openSnackBar('Session expired. Please login again', 'close');
      // this.router.navigateByUrl('main/login');
    }
  }

  checkAdminRole(): boolean {
    const tokenPayload = this.decodedToken();
    const isAdminPresent = tokenPayload.authorities.some(
      (authority: any) => authority.authority === 'ADMIN'
    );
    if (isAdminPresent) return true;
    return false;
  }

  checkUserRole(): boolean {
    const tokenPayload = this.decodedToken();
    const isUserPresent = tokenPayload.authorities.some(
      (authority: any) => authority.authority === 'USER'
    );
    if (isUserPresent) return true;
    return false;
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
