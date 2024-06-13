import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HeaderComponent } from './header/header.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPassowrdComponent } from './reset-passowrd/reset-passowrd.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GithubLoginComponent } from './github-login/github-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    HeaderComponent,
    MainHomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPassowrdComponent,
    GithubLoginComponent,
    ChangePasswordComponent,
  ],
  imports: [NgxUiLoaderModule.forRoot({}), CommonModule, FormsModule, ReactiveFormsModule, HomeRoutingModule, MatIconModule, MatDialogModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class  HomeModule {}
