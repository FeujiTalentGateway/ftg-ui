import { Component, Inject, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgOtpInputConfig } from 'ng-otp-input';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
  
})
export class EmailVerificationComponent implements OnInit {
  userDetails!: User;
  otpValue:string="";
  errorMessage: string = '';
  constructor(
    public dialogRef: MatDialogRef<EmailVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    
  ) {
  }

  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  ngOnInit() {
    this.userDetails = this.dialogData.user;
  }
verifyOtp(){
  var correctOtp='123456'
    if (this.otpValue !== correctOtp) {
      this.errorMessage = 'Incorrect OTP. Please try again.';
    }
    else{
     alert(this.otpValue)
    }
  }
  onOtpChange(otp: string) {
    this.otpValue = otp;
    if (this.otpValue.length === 6) {
      this.errorMessage = '';  // Clear the error message when OTP is fully entered
    }
  }
}


