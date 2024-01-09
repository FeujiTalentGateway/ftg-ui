import { Injectable } from '@angular/core';
import { RestDataService } from './restdataservice';
import { User } from '../models/user.model';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRepo:RestDataService, private route: Router, private snackBar: MatSnackBar) { }
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      
    });
  }
}
