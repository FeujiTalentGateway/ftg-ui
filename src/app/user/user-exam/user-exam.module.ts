import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ExamCodeComponent } from './exam-code/exam-code.component';
import { ExamInstructionsComponent } from './exam-instructions/exam-instructions.component';
import { ExamSubmittedComponent } from './exam-submitted/exam-submitted.component';
import { ExamComponent } from './exam/exam.component';
import { QuestionsComponent } from './questions/questions.component';
import { RemoveInspectComponent } from './remove-inspect/remove-inspect.component';
import { ResultChartComponent } from './result-chart/result-chart.component';
import { UserExamRoutingModule } from './user-exam-routing.module';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ViewResultComponent } from './view-result/view-result.component';

@NgModule({
  declarations: [
    ViewExamsComponent,
    ExamCodeComponent,
    ExamInstructionsComponent,
    ExamComponent,
    QuestionsComponent,
    ViewResultComponent,
    ExamSubmittedComponent,
    ResultChartComponent,
    RemoveInspectComponent,
  ],
  imports: [
    CommonModule,
    UserExamRoutingModule,
    FormsModule,
    SharedModuleModule,
  ],
})
export class UserExamModule {}
