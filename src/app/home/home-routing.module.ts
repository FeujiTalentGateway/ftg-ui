import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  {
    path: 'home',
    component: MainHomeComponent,
    canActivate: [AuthGuard], // Route to the HomePageComponent when /home is accessed
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
