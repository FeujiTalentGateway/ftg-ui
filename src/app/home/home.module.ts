import { NgModule } from '@angular/core';
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
import { MatCardModule } from '@angular/material/card';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
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
    EmailVerificationComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HomeRoutingModule, MatIconModule, MatDialogModule,
    MatCardModule,MatFormFieldModule,MatButtonModule,NgOtpInputModule],
})
export class  HomeModule {}
