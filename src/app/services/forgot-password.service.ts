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
  otpStatus:boolean=false
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
            emailId: email,
          };
           this.openOtpVerifyComponent(user);
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
    this.dialogRef= this.matDialog.open(OtpVerificationComponent, dialogConfig);
  }
  verifyOtp(otp: Otp) {
    this.authRepo.verifyOtp(otp).subscribe({
      next:(response: any) => {
        if (response.message === 'Account verified successfully. Please login') {
          this.openSnackBar('Account verified successfully. Please login', 'Close');
          this.dialogRef.close();
          sessionStorage.setItem('otp', otp.otp);
          this.otpStatus=true
          this.route.navigate(['/main/login']);
        }
        else if(response.message === 'Account verified successfully. Please change your password.'){
            this.otpStatus=true;
            this.dialogRef.close()
            sessionStorage.setItem('otp', otp.otp);
            this.route.navigate(['/main/reset-password']);
        }
        else{
          this.openSnackBar("Something went wrong. Try later", 'Close');
        }
      },
      error: (error: any) => {
        if(error.error.message==='Invalid OTP'){
          this.openSnackBar("Incorrect otp", 'Close')
        }
        else{
          this.openSnackBar( error.error.message, 'Close');
        }
        
      },
    });
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
      otp: sessionStorage.getItem('otp') as string,
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