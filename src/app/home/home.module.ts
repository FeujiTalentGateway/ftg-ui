import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HeaderComponent } from './header/header.component';
import { MainHomeComponent } from './main-home/main-home.component';



@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    HeaderComponent,
    MainHomeComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
    
  ]
})
export class HomeModule { }
