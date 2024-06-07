import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleLoginService } from 'src/app/services/google-login.service';

// Custom validator function for username format
function usernameFormatValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const username = control.value;
  if (!/^[a-zA-Z]{4}[a-zA-Z0-9\s\S]*$/.test(username)) {
    return { invalidUsername: true };
  }
  return null;
}

export function passwordMatch(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField)?.value;
    const confirmPassword = control.get(confirmPasswordField)?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements AfterViewInit {
  @ViewChild('form') form!: NgForm;

  constructor(
    private authService: AuthService,
    private ngxLoader: NgxUiLoaderService,
    private router: Router,
    private googleAuthService: GoogleLoginService
  ) {}

  name: string = '';
  confirmPassword: string = '';
  formSubmitted: boolean = false;
  newuser: User = new User();

  ngAfterViewInit() {
    this.googleAuthService.loadGoogleSignInScript().then(() => {
      this.googleAuthService.initializeGoogleSignInButton(
        this.handleGoogleCredentialResponse.bind(this)
      );
    });
  }

  createUser() {
    const userData: User = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      userName: this.registerForm.get('userName')?.value,
      emailId: this.registerForm.get('email')?.value,
      password: btoa(this.registerForm.get('password')?.value as string),
    };
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 2000);
    this.authService.register(userData);
  }

  registeredEmail!: string;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
      Validators.pattern(this.emailRegex),
    ]),
  });

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s']{1,32}$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s-']{1,32}$/),
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        usernameFormatValidator,
      ]),
      email: new FormControl(this.registeredEmail, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(this.emailRegex),
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
    [passwordMatch('password', 'confirmPassword')]
  );

  getControl(property: any): AbstractControl | null {
    return this.registerForm.get(property);
  }

  getEmailFormControl(property: any): AbstractControl | null {
    return this.emailForm.get(property);
  }

  passwordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  confirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  register(data: FormGroup) {
    this.createUser();
  }

  handleGoogleCredentialResponse(response: any) {
    this.googleAuthService.handleGoogleCredentialResponse(response);
  }
}
