import { Component, ViewChild } from '@angular/core';
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
import { GoogleUser } from 'src/app/models/google-user.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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

declare var google: any;

export function passwordMatch(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField)?.value;
    const confirmPassword = control.get(confirmPasswordField)?.value;

    // Check if both password and confirmPassword fields have values
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
export class UserRegistrationComponent {
  @ViewChild('form') form!: NgForm;

  constructor(private authService: AuthService, private ngxLoader: NgxUiLoaderService,private router:Router) {}
  name: string = '';
  confirmPassword: string = '';
  formSubmitted: boolean = false;
  newuser: User = new User();


  ngAfterViewInit() {
    this.loadGoogleSignInScript().then(() => {
      this.initializeGoogleSignInButton();
    });
  }
  
  private loadGoogleSignInScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }
  

  private initializeGoogleSignInButton() {
    google.accounts.id.initialize({
      client_id: '842949696777-b3duehfjqha22vsqefbp2ql8lnisgeaa.apps.googleusercontent.com',
      callback: (response: any) => {
        console.log(response.credential);
        this.handleGoogleCredentialResponse(response);
      }
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'circle',
        width: '150',
      }
    );
  }
  createUser() {
    const userData: User = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      userName: this.registerForm.get('userName')?.value,
      emailId: this.registerForm.get('email')?.value,
      password: btoa(this.registerForm.get('password')?.value as string),
    };
    this.ngxLoader.start(); // Show the loader
      setTimeout(() => {
        this.ngxLoader.stop(); // Hide the loader after some delay
      }, 2000);
    this.authService.register(userData);
  }

  registeredEmail!: string;
  // Flags for password visibility
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  //Email Verification Form
  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
      Validators.pattern(this.emailRegex),
    ]),
  });

  // Form group for registration
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

  // Function to get a form control by its property name
  getControl(property: any): AbstractControl | null {
    return this.registerForm.get(property);
  }
  getEmailFormControl(property: any): AbstractControl | null {
    return this.emailForm.get(property);
  }

  // Function to toggle password visibility
  passwordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Function to toggle confirm password visibility
  confirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  // Function to handle user registration
  register(data: FormGroup) {
    this.createUser();
  }

  private decodeToken(token: string): GoogleUser {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return {
      name: decodedToken.name,
      email: decodedToken.email
    };
  }
  handleGoogleCredentialResponse(response: any) {
    if (response) {
      const googleUser: GoogleUser = this.decodeToken(response.credential);
      localStorage.setItem('google-user', JSON.stringify(googleUser));
      this.authService.loginWithGoogle(googleUser);
    }
  }

}
