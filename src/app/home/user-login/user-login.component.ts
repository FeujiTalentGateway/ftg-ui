import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleLoginService } from 'src/app/services/google-login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private ngxLoader: NgxUiLoaderService,
    private googleAuthService: GoogleLoginService
  ) {}

  username: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  formSubmitted: boolean = false;

  ngAfterViewInit() {
    this.googleAuthService.loadGoogleSignInScript().then(() => {
      this.googleAuthService.initializeGoogleSignInButton(this.handleGoogleCredentialResponse.bind(this));
    });
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ToggleEye() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  userForm?: FormGroup;

  onLogin() {
    this.formSubmitted = true;
    if (this.userForm?.valid) {
      this.ngxLoader.start();
      setTimeout(() => {
        this.ngxLoader.stop();
      }, 2000);
      this.authService.login(this.userForm);
    }
  }

  handleGoogleCredentialResponse(response: any) {
    this.googleAuthService.handleGoogleCredentialResponse(response);
  }
}
