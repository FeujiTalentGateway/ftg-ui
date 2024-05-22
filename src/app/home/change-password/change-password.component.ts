import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatch } from '../user-registration/user-registration.component';
import { ChangePasswordService } from 'src/app/services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  oldPasswordVisible: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  /**
   *
   */
  constructor(private changePasswordService: ChangePasswordService) {}

  changePasswordRequestForm = new FormGroup(
    {
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(8),
      ]),
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
    { validators: passwordMatch('password', 'confirmPassword') }
  );

  getControl(property: string): AbstractControl | null {
    return this.changePasswordRequestForm.get(property);
  }

  toggleVisibility(field: string) {
    switch (field) {
      case 'oldPassword':
        this.oldPasswordVisible = !this.oldPasswordVisible;
        break;
      case 'password':
        this.passwordVisible = !this.passwordVisible;
        break;
      case 'confirmPassword':
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
        break;
      default:
        break;
    }
  }
  onSubmit() {
    if (this.changePasswordRequestForm.valid) {
      const pass ={
        oldPassword : btoa(this.changePasswordRequestForm.get('oldPassword')?.value as string),
        newPassword : btoa(this.changePasswordRequestForm.get('password')?.value as string)
      }
     //btoa(this.registerForm.get('password')?.value as string)
      console.log('Form Submitted', pass);
      this.changePasswordService
        .changePassword(pass)
        .subscribe(
          (response) => {
            console.log(response)
            console.log('Password changed successfully', response);
          },
          (error) => {
            console.log(error)
            console.error('Error changing password', error);
          }
        );
    }
  }
}
