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

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp-verification', component: OtpVerificationComponent, canActivate: [passwordChangeGuard]},
  { path: 'reset-password', component: ResetPassowrdComponent},
  { path: 'home', component: MainHomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
