import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

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
      this.authService.login(this.userForm);
    }
  }
}
