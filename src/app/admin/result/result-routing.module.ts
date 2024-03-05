import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsPageComponent } from './exams-page/exams-page.component';
import { ExamSummaryComponent } from './exam-summary/exam-summary.component';
import { UsersResultComponent } from './users-result/users-result.component';
import { DetailedUserResultComponent } from './detailed-user-result/detailed-user-result.component';

const routes: Routes = [
  {
    path: "view-results",
    component:ExamsPageComponent
  },
  {
    path: "summary/:examCode",
    component:ExamSummaryComponent
  },
  {
    path: "users-result/:examCode",
    component:UsersResultComponent
  },
  {
    path: "detailed-user-result/:examCode/:userId",
    component:DetailedUserResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
