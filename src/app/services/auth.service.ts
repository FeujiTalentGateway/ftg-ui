import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserLoginModel } from '../models/user-login.model';
import { User } from '../models/user.model';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { UserdetailsService } from './userdetails.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  authTokenKey: string = environment.authTokenKey;
  dialogRef: any;
  roles: any[] = [];
  constructor(
    private authRepo: AuthRepositoryService,
    private snackBar: SnackBarService,
    private route: Router,
    private userDetails: UserdetailsService,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  // Handle user registration based on form data

  register(user: User) {
    this.ngxLoader.start();
    // Send the registration data to the server and handle the response
    this.authRepo.register(user).subscribe({
      next: (response: any) => {
        const responseMessage: string = response.message;
        this.ngxLoader.stop();
        this.snackBar.openSnackBar(response.message, 'Close');
        if (responseMessage.includes('User successfully registered with')) {
          this.snackBar.openSnackBarSuccessMessage(responseMessage, 'Close');
          this.route.navigateByUrl('main/login');
        }
        this.ngxLoader.stop();
      },
      error: (error: any) => {
        const responseMessage: string = error.error.message;
        this.ngxLoader.stop();
        if (responseMessage == 'Username already exists') {
          this.snackBar.openSnackBarForError(
            "Username '" + user.userName + "' already exists",
            'Close'
          );
        } else if (responseMessage == 'Email already exists') {
          this.snackBar.openSnackBarForError(
            "Email '" + user.emailId + "' already exists",
            'Close'
          );
        }
        this.snackBar.openSnackBarForError(responseMessage, 'Close');
      },
    });
  }
  login(loginData: FormGroup) {
    localStorage.removeItem('Email-Token');
    this.ngxLoader.start();
    // Create a new instance of LoginUser with the form data
    const user: UserLoginModel = {
      userName: loginData.value.userName,
      password: btoa(loginData.value.password),
    };

    this.authRepo.login(user).subscribe({
      next: (response: any) => {
        this.ngxLoader.stop();
        if (response.message == 'Successfully logged in') {
          this.snackBar.openSnackBarSuccessMessage('Login successfully', 'Close');
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
        this.ngxLoader.stop();
        if (error.status === 400) {
          this.snackBar.openSnackBarForError(error.error.message, 'Close');
        } else {
          this.snackBar.openSnackBarForError('Something went wrong', 'Close');
        }
      },
    });
  }
  setJwtToken(token: any) {
    localStorage.setItem(this.authTokenKey, token);
  }
  removeJwtToken() {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem('role');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const jwtToken = localStorage.getItem(this.authTokenKey) || '';
    try {
      this.userPayload = jwtHelper.decodeToken(jwtToken);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
    return this.userPayload;
  }

  // Check if the JWT token has expired
  isTokenExpired() {
    const jwtHelper = new JwtHelperService();
    const jwtToken = localStorage.getItem(this.authTokenKey)!;
    return jwtHelper.isTokenExpired(jwtToken);
  }

  templogin(loginData: FormGroup) {
    if (loginData) {
      localStorage.setItem('role', loginData.value.userName);
      this.route.navigateByUrl('/user/home');
    }
  }

  // Get the JWT token from local storage if it exists.
  // Returns the JWT token as a string or "no jwt token" if it doesn't exist.
  getJwtToken(): string {
    if (localStorage.getItem(this.authTokenKey)) {
      return localStorage.getItem(this.authTokenKey) + '';
    } else {
      return 'no jwt token';
    }
  }

  // Check if the user is logged in by verifying the presence of a JWT token in local storage.
  // Returns true if the user is logged in, otherwise false.
  isLoggedin(): boolean {
    this.sessionExpired();
    return !!localStorage.getItem(this.authTokenKey);
  }

  sessionExpired() {
    if (this.isTokenExpired()) {
      localStorage.removeItem(this.authTokenKey);
      this.snackBar.openSnackBarSuccessMessage('Session expired. Please login again', 'close');
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

  loginWithGoogle(GoogleUser: any) {
    localStorage.removeItem('Email-Token');
    this.ngxLoader.start();
    this.authRepo.loginWithGoogle(GoogleUser).subscribe({
      next: (response: any) => {
        this.ngxLoader.stop();
        if (response.message == 'Successfully logged in') {
          this.snackBar.openSnackBarSuccessMessage('Login successfully', 'Close');
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
        this.ngxLoader.stop();
        if (error.status === 400) {
          this.snackBar.openSnackBarForError(error.error.message, 'Close');
        } else {
          this.snackBar.openSnackBarForError('Something went wrong', 'Close');
        }
      },
    });
  }

}