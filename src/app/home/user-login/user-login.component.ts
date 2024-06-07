import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute,private githubService:GithubService, private authService: AuthService, private ngxLoader: NgxUiLoaderService) {}

  // Properties to store user input and form state
  username: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  formSubmitted: boolean = false;

  ngOnInit() {
    // Initializing the user form with validation using Reactive Forms
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
          this.githubService.handleGitHubCallback(code);
      } else {
          this.router.navigate(['/login']);
      }
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
}
