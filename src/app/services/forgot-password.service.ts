import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest';
import { OtpVerificationComponent } from '../home/otp-verification/otp-verification.component';
import { Otp } from '../models/otpDto.model';
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  dialogRef: any;
  roles :any []=[];
  constructor(
    private authRepo: AuthRepositoryService,
    private snackBar: MatSnackBar,
    private route: Router,
    private matDialog: MatDialog,
  ) {}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'centered-snackbar', // Apply a custom CSS class
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  sendOtpToEmail(email: string) {
    this.authRepo.sendOtpToEmail(email).subscribe({
      next: (response: any) => {
        const responseBody = response;
        const responseStatus = response.status;
        if(responseStatus === 200){
          let user: any;
          sessionStorage.setItem('password-token',response.body.otp);
          sessionStorage.setItem('email', email);
          user = {
            //userName: responseBody.userName,
            registeredEmail: responseBody.registeredEmail,
          };
          this.dialogRef = this.openOtpVerifyComponent(user);
        }
        if(response.message==='email not found'){
          this.openSnackBar("Account not found", 'Close');
        }
      },
      error: (error: any) => {
        const errorMessage = error.error.message;
        if(errorMessage==='email not found'){
          this.openSnackBar("Account not found", 'Close');
        }
        else this.openSnackBar(errorMessage, 'Close');
        // if (errorMessage === 'No user exists with email: ' + email) {
        //   this.openSnackBar(errorMessage, 'Close');
        // }
      },
    });
  }
  openOtpVerifyComponent(user: any) {
    let dialogConfig: MatDialogConfig = {
      width: '70%',
      height: '50%',
      disableClose: true,
    };
    dialogConfig.data = {
      user: user,
    };
    return this.matDialog.open(OtpVerificationComponent, dialogConfig);
  }
  verifyOtp(otp: Otp) {
    this.authRepo.verifyOtp(otp)
    .subscribe({
      next: (response: any) => {
        if (response.message === 'Account verified successfully. Please login') {
          this.openSnackBar('Account verified successfully. Please login', 'Close');
          this.dialogRef.close();
          this.route.navigate(['/main/login']);
        }
        else if(response.message ==='Invalid OTP'){
          this.openSnackBar("Incorrect otp", 'Close')
        }
        else{
          this.openSnackBar("Something went wrong. Try later", 'Close');
        }
      },
      error: (error: any) => {
        this.openSnackBar( error.error.message, 'Close');
      },
    });
    // const headerKey: string = 'password-token';
    // const passwordToken: string = sessionStorage.getItem(headerKey) as string;
    // if(passwordToken === otp){
    //   this.openSnackBar("Success", 'Close');
    //   this.dialogRef.close();
    //   this.dialogRef = this.openResetPasswordComponent();
    // }
    // else{
    //   if(otp===null)this.openSnackBar("Something went wrong. Try later", 'Close');
    //   else this.openSnackBar("Incorrect otp", 'Close');
    // }
  }
  openResetPasswordComponent() {
    let dialogConfig: MatDialogConfig = {
      width: '100%',
      height: '100%',
      disableClose: true,
    };
    this.route.navigate(['/main/reset-password']);
  }

  setPasswordRequestForForgotPassword(forgotPasswordRequestForm: FormGroup) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const forgotPasswordRequest: ForgotPasswordRequest = {
      email: sessionStorage.getItem('email') as string,
      newPassword: btoa(forgotPasswordRequestForm.value.password),
    };

    const options = { headers: headers };

    this.authRepo
      .setPasswordRequestForForgotPassword(forgotPasswordRequest, options)
      .subscribe({
        next: (response: any) => {
          if (response.message === 'password changed') {
            
            this.openSnackBar('Password changed successfully', 'Close');
            sessionStorage.removeItem('password-token');
            this.route.navigate(['/main/login']);
          }
        },
        error: (error: any) => {
          this.openSnackBar( error.error.message, 'Close');
          sessionStorage.removeItem('password-token');
        },
      });
  }

}
