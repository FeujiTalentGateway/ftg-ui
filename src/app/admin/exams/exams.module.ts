import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';


@NgModule({
  declarations: [
    ExamsComponent,
    ViewExamsComponent,
    ScheduleExamComponent
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule
  ]
})
export class ExamsModule { }
