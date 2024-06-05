import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GoogleUser } from 'src/app/models/google-user.model';
import { AuthService } from 'src/app/services/auth.service';

declare var google: any;
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  // Properties to store user input and form state
  username: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  formSubmitted: boolean = false;

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
      client_id:
        '842949696777-b3duehfjqha22vsqefbp2ql8lnisgeaa.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleGoogleCredentialResponse(response);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'circle',
      width: '150',
    });
  }

  ngOnInit() {
    // Initializing the user form with validation using Reactive Forms
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  // Function to toggle the visibility of the password
  ToggleEye() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Property to hold the user form
  userForm?: FormGroup;

  // Function triggered on login button click
  onLogin() {
    // Set formSubmitted flag to true
    this.formSubmitted = true;

    // Check if the form is valid
    if (this.userForm?.valid) {
      this.ngxLoader.start(); // Show the loader
      setTimeout(() => {
        this.ngxLoader.stop(); // Hide the loader after some delay
      }, 2000);
      this.authService.login(this.userForm);
    }
  }

  private decodeToken(token: string): GoogleUser {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      name: decodedToken.name,
      emailId : decodedToken.email,
      password : btoa(decodedToken.sub),
      isActive : decodedToken.email_verified

    };
  }
  handleGoogleCredentialResponse(response: any) {
    if (response) {
      const googleUser: GoogleUser = this.decodeToken(response.credential);
      // localStorage.setItem('google-user', JSON.stringify(googleUser));
      this.authService.loginWithGoogle(googleUser);
    }
  }
}
