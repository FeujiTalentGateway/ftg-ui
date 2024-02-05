import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  {
    path: "home",
    component:AdminHomeComponent
  },
  {
    path: "exams",
    loadChildren: () =>
      import("./exams/exams.module").then((m) => m.ExamsModule),
  },
  {
    path: "users",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "questionPapers",
    loadChildren: () =>
      import("./question-papers/question-papers.module").then((m) => m.QuestionPapersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

//exams
//users
//roles
//access