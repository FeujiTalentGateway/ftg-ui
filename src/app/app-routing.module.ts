import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { MainHomeComponent } from './home/main-home/main-home.component';
import { CanActivateForHome } from './home/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'home', component: MainHomeComponent ,canActivate:[CanActivateForHome]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
