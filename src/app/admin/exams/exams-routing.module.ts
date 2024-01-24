import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: 'scheduleExam', component: ScheduleExamComponent },
  { path: 'viewExams', component: ViewExamsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    DatePipe
  ],
})
export class ExamsRoutingModule { }