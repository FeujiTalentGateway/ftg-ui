import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { Router } from '@angular/router';
import { UserdetailsService } from './userdetails.service';
import { FormGroup } from '@angular/forms';
import { UserLoginModel } from '../models/user-login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any;
  dialogRef: any;
  constructor(
    private authRepo: AuthRepositoryService,
     private snackBar: MatSnackBar,
    private route: Router,
    private userDetails: UserdetailsService,
  ) {}
  login(loginData: FormGroup) {
    localStorage.removeItem('Email-Token');
    // Create a new instance of LoginUser with the form data
    const user: UserLoginModel = {
      userName: loginData.value.userName,
      password: loginData.value.password,
    };
    // Create a new instance of LoginUser with the form data

    // Send the login data to the server and handle the response
    this.authRepo.login(user).subscribe({
      next: (response: any) => {
        console.log(response.message);
        if (response.message == 'Successfully logged in') {
          console.log('successfully login');
          this.openSnackBar('Login successfully', 'Close');
          this.setJwtToken(response.token);
          const tokenPayload = this.decodedToken();
          this.userDetails.setUserNameFromToken(this.userPayload.sub);
          this.userDetails.setRoleFromToken(
            this.userPayload.authorities[0].authority
          );
          this.route.navigateByUrl('/home');
        }
        if (response.message == 'Invalid username or password')
          this.openSnackBar('Invalid username or passwordy logged in', 'Close');
      },
      error: (error: any) => {
        if (error.status == 403) {
          this.openSnackBar('Invalid Username or Password', 'Close');
        } else {
          this.openSnackBar('Something went wrong', 'Close');
        }
      },
    });
  }
  setJwtToken(token: any) {
    localStorage.setItem('token', token);
  }decodedToken() {
    const jwtHelper = new JwtHelperService();
    const jwtToken = localStorage.getItem('token') || '';
    try {
      this.userPayload = jwtHelper.decodeToken(jwtToken);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
    return this.userPayload;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'centered-snackbar', // Apply a custom CSS class
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }


}
