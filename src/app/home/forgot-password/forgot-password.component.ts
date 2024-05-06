import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  isOtpSentDisabled: boolean = false
  constructor(
    private forgotPassword: ForgotPasswordService,
  ) { }
  
  emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    //Email Verification Form
    emailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(this.emailRegex),
      ]),
    });

  // Function to get the form control by name
  getControl(email: any): AbstractControl | null {
    return this.emailForm.get(email);
  }

  // Function to toggle password visibility

  // Function to handle login submission
  sendOtpToEmail(loginData: FormGroup) {
    this.isOtpSentDisabled = true;
    const email = loginData.get('email')?.value;
    this.forgotPassword.sendOtpToEmail(email);
    setTimeout(() => {
      this.isOtpSentDisabled = !this.isOtpSentDisabled;
    }, 5000);
  }
}
