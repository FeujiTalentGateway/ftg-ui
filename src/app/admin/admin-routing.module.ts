import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { adminGuard, loginGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminHomeComponent,
  },
  {
    path :'profile',
    component : ProfileComponent
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
    canActivate: [adminGuard, loginGuard]
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
    path: 'coadingquestion',
    loadChildren: () =>
      import('./coding-questions/coding-question.module').then(
        (m) => m.CodingQuestionModule
      ),
    // canActivate: [adminGuard, loginGuard],
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
