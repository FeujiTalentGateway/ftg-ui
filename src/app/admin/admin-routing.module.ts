import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard, loginGuard } from '../guards/auth.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminHomeComponent,
  },
  {
    path: 'exams',
    loadChildren: () =>
      import('./exams/exams.module').then((m) => m.ExamsModule),
    canActivate: [adminGuard, loginGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'questionPapers',
    loadChildren: () =>
      import('./question-papers/question-papers.module').then(
        (m) => m.QuestionPapersModule
      ),
    canActivate: [adminGuard, loginGuard],
  },
  {
    path: 'result',
    loadChildren: () =>
      import('./result/result.module').then((m) => m.ResultModule),
    canActivate: [adminGuard, loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

//exams
//users
//roles
//access
