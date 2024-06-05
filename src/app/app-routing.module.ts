import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { loginGuard } from './guards/auth.guard';
import { UserExamLayoutComponent } from './layout/app-layout/user-exam-layout/user-exam-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/main/home', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },

  {
    path: 'main',
    component: AuthLayoutComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'exam',
    component: UserExamLayoutComponent,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'error',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule
      ),
  },
  {
    path: 'exams',
    loadChildren: () =>
      import('./admin/exams/exams.module').then((m) => m.ExamsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./admin/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'qp',
    loadChildren: () =>
      import('./admin/question-papers/question-papers.module').then(
        (m) => m.QuestionPapersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
