import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPassowrdComponent } from './reset-passowrd/reset-passowrd.component';
import { passwordChangeGuard } from '../guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp-verification', component: OtpVerificationComponent, canActivate: [passwordChangeGuard]},
  { path: 'reset-password', component: ResetPassowrdComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  {
    path: 'home',
    component: MainHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
