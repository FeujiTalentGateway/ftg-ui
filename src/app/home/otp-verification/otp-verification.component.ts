import { Component, NgZone, Inject  } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { Otp } from 'src/app/models/otpDto.model';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {
  otpForm = this.fb.group({
    digit1: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
    digit2: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
    digit3: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
    digit4: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
    digit5: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
    digit6: ['', [Validators.required, Validators.pattern(/^\d{1}$/)]],
  });

  remainingTime = 60; // 1 minute in seconds
  timerSubscription!: Subscription;
  otpModel !:Otp;
  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private forgotPassword: ForgotPasswordService,
    public dialogRef: MatDialogRef<OtpVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) {

    this.otpModel = { otp: '', email: '' };
  }

  ngOnInit() {
    this.startTimer();
  }

  moveToNextInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      this.focusNextInput(index);
    }
  }

  // otp-verify.component.ts
  focusNextInput(index: number) {
    const nextIndex = index + 1;
    if (nextIndex < 6) {
      const nextDigit = this.otpForm.get(`digit${nextIndex}`);
      if (nextDigit && nextDigit instanceof AbstractControl) {
        const element = document.getElementById(`digit${nextIndex + 1}`);
        if (element instanceof HTMLInputElement) {
          element.focus();
        }
      }
    }
  }

  startTimer() {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.ngZone.run(() => {
        this.remainingTime--;

        if (this.remainingTime <= 0) {
          this.timerSubscription.unsubscribe();
        }
      });
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitOtp() {
    if (this.otpForm.valid) {
      var enteredOtp = Object.values(this.otpForm.value).join('');
      this.otpModel.otp=enteredOtp
      this.otpModel.email=this.userData.user.emailId
      this.forgotPassword.verifyOtp(this.otpModel)
      if(this.forgotPassword.otpStatus){
        this.closeDialog()
        this.timerSubscription.unsubscribe();
      }
      else{
        this.startTimer()
      }
      
    }
  }

  resendOTP() {
    const userName = this.userData.user.emailId;
    this.closeDialog();
    this.forgotPassword.sendOtpToEmail(userName);
  }
}
