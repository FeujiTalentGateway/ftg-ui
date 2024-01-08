import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/models/user-login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private router: Router
    ,private authService:AuthService) {

  }
  username: string = '';
  password: string = '';
  isPasswordVisible:boolean=false
  formSubmitted:boolean=false

  userLogin:UserLoginModel=new UserLoginModel()  //using UserLoginModel

  ngOnInit() {
    this.userForm = new FormGroup({
      userName:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    })
  }

  ToggleEye(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  userForm?:FormGroup
  onLogin() {
    this.formSubmitted=true
    if(this.userForm?.valid){
      this.userLogin.userName = this.userForm.controls['userName'].value
      this.userLogin.password = this.userForm.controls['password'].value
      console.log(this.userLogin);
      this.authService.login(this.userForm)
      this.router.navigate(['home']);
    }
  }
}
