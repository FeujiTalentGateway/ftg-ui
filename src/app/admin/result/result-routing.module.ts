import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamsPageComponent } from './exams-page/exams-page.component';
import { ExamSummaryComponent } from './exam-summary/exam-summary.component';

const routes: Routes = [
  {
    path: "home",
    component:ExamsPageComponent
  },
  {
    path: "summary/:examCode",
    component:ExamSummaryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
