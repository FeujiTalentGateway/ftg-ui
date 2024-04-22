import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatch } from 'src/app/validators/passwordMatch';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-reset-passowrd',
  templateUrl: './reset-passowrd.component.html',
  styleUrls: ['./reset-passowrd.component.css']
})
export class ResetPassowrdComponent {
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor(private forgotPassword: ForgotPasswordService) {}

  // Form group for registration
  forgotPasswordRequestForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(8),
      ]),
    },
    [passwordMatch('password', 'confirmPassword')]
  );

  // Function to get a form control by its property name
  getControl(property: any): AbstractControl | null {
    return this.forgotPasswordRequestForm.get(property);
  }

  // Function to toggle password visibility
  passwordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Function to toggle confirm password visibility
  confirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  register(data: FormGroup) {
    console.log('Inside register component: register()');
    this.forgotPassword.setPasswordRequestForForgotPassword(data);
  }
}
