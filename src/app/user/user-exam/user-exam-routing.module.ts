import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ExamCodeComponent } from './exam-code/exam-code.component';
import { ExamInstructionsComponent } from './exam-instructions/exam-instructions.component';
import { ExamComponent } from './exam/exam.component';
import { ExamSubmittedComponent } from './exam-submitted/exam-submitted.component';
import { ViewResultComponent } from './view-result/view-result.component';

const routes: Routes = [
  {
    path: 'view-exam',
    component: ViewExamsComponent,
  },
  {
    path: 'exam-code',
    component: ExamCodeComponent,
  },
  {
    path: 'exam-instructions/:examCode',
    component: ExamInstructionsComponent,
  },

  {
    path: 'exam/:examCode',
    component: ExamComponent,
  },
  {
    path: 'exam-submitted/:examCode/:examAttemptId',
    component: ExamSubmittedComponent,
  },
  {
    path: 'view-result/:examCode/:examAttemptId',
    component: ViewResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserExamRoutingModule {}
