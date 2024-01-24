import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { Router } from '@angular/router';
import { UserdetailsService } from './userdetails.service';
import { FormGroup } from '@angular/forms';
import { UserLoginModel } from '../models/user-login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  dialogRef: any;
  roles :any []=[];
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
          // this.route.navigateByUrl('login');
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
      password: loginData.value.password,
    };

    this.authRepo.login(user).subscribe({
      next: (response: any) => {
        console.log(response.message);
        if (response.message == 'Successfully logged in') {
          this.openSnackBar('Login successfully', 'Close');
          this.setJwtToken(response.token);
          const tokenPayload = this.decodedToken();
          this.userDetails.setUserNameFromToken(this.userPayload.sub);
          this.userDetails.setRoleFromToken(
            this.userPayload.authorities
          );
          sessionStorage.setItem('roles',this.userPayload.authorities.map((e: { authority: any; }) => e.authority))
          console.log(this.userDetails.getRoleFromToken(), '---tocken----  ');
          this.route.navigateByUrl('/user/home');
        }
        if (response.message == 'Invalid username or password')
          this.openSnackBar('Invalid username or password', 'Close');
      },
      error: (error: any) => {
        if (error.status == 400) {
          this.openSnackBar('Invalid Username or Password', 'Close');
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
      panelClass: 'centered-snackbar', // Apply a custom CSS class
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


}
