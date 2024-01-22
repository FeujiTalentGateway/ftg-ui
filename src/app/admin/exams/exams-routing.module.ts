import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';

const routes: Routes = [
  { path: 'scheduleExam', component: ScheduleExamComponent },
  { path: 'viewExams', component: ViewExamsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
