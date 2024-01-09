import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { MainHomeComponent } from './home/main-home/main-home.component';
import { AuthGuard } from './home/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'home', component: MainHomeComponent, 
  canActivate: [AuthGuard]  // Route to the HomePageComponent when /home is accessed
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
