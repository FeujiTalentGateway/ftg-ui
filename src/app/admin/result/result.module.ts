import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ExamsPageComponent } from './exams-page/exams-page.component';
import { ExamSummaryComponent } from './exam-summary/exam-summary.component';
import { PercentageCircleComponent } from './percentage-circle/percentage-circle.component';


@NgModule({
  declarations: [
    ExamsPageComponent,
    ExamSummaryComponent,
    PercentageCircleComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule
  ]
})
export class ResultModule { }
