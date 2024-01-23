import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  username: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  formSubmitted: boolean = false;

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
      this.authService.templogin(this.userForm);
      
    }
  }
}
