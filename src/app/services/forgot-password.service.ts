import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OtpVerificationComponent } from '../home/otp-verification/otp-verification.component';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest';
import { Otp } from '../models/otpDto.model';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { SnackBarService } from './snack-bar.service';
@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  dialogRef: any;
  roles: any[] = [];
  otpStatus: boolean = false;
  constructor(
    private authRepo: AuthRepositoryService,
    private snackBar: SnackBarService,
    private route: Router,
    private matDialog: MatDialog,
    private ngxLoader: NgxUiLoaderService
  ) {}
  sendOtpToEmail(email: string) {
    this.ngxLoader.start();
    this.authRepo.sendOtpToEmail(email).subscribe({
      next: (response: HttpResponse<any>) => {
        this.ngxLoader.stopAll();
        const responseBody = response.body;
        const responseStatus = response.status;

        if (responseStatus === 200) {
          let user: any;
          sessionStorage.setItem('password-token', responseBody.otp);
          sessionStorage.setItem('email', email);

          user = {
            emailId: email,
          };
          this.dialogRef = this.openOtpVerifyComponent(user);
        }

        if (responseBody.message === 'email not found') {
          this.snackBar.openSnackBarForError('Account not found', 'Close');
        }
      },
      error: (error: any) => {
        this.ngxLoader.stopAll();
        const errorMessage = error.error.message;
        console.error('Error received:', errorMessage);

        if (errorMessage === 'email not found') {
          this.snackBar.openSnackBarForError('Account not found', 'Close');
        } else {
          this.snackBar.openSnackBarForError(errorMessage, 'Close');
        }
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
    this.dialogRef = this.matDialog.open(
      OtpVerificationComponent,
      dialogConfig
    );
  }
  verifyOtp(otp: Otp) {
    this.authRepo.verifyOtp(otp).subscribe({
      next: (response: any) => {
        if (
          response.message === 'Account verified successfully. Please login'
        ) {
          this.snackBar.openSnackBarSuccessMessage(
            'Account verified successfully. Please login',
            'Close'
          );
          this.dialogRef.close();
          sessionStorage.setItem('otp', otp.otp);
          this.otpStatus = true;
          this.route.navigate(['/main/login']);
        } else if (
          response.message ===
          'Account verified successfully. Please change your password.'
        ) {
          this.otpStatus = true;
          this.dialogRef.close();
          sessionStorage.setItem('otp', otp.otp);
          this.route.navigate(['/main/reset-password']);
        } else {
          this.snackBar.openRedAlertSnackBar(
            'Something went wrong. Try later',
            'Close'
          );
        }
      },
      error: (error: any) => {
        console.log(error);
        if (error.error.message === 'Invalid OTP') {
          this.snackBar.openRedAlertSnackBar('Incorrect otp', 'Close');
        } else {
          this.snackBar.openRedAlertSnackBar(error.error.message, 'Close');
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
            this.snackBar.openSnackBarSuccessMessage(
              'Password changed successfully',
              'Close'
            );
            sessionStorage.removeItem('password-token');
            this.route.navigate(['/main/login']);
          }
        },
        error: (error: any) => {
          this.snackBar.openSnackBarForError(error.error.message, 'Close');
          sessionStorage.removeItem('password-token');
        },
      });
  }
}
