import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { loginGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: UserHomePageComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'exam',
    loadChildren: () =>
      import('./user-exam/user-exam.module').then((m) => m.UserExamModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
