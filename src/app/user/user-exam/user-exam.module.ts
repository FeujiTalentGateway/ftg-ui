import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserExamRoutingModule } from './user-exam-routing.module';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ExamCodeComponent } from './exam-code/exam-code.component';
import { FormsModule } from '@angular/forms';
import { ExamInstructionsComponent } from './exam-instructions/exam-instructions.component';
import { ExamComponent } from './exam/exam.component';
import { QuestionsComponent } from './questions/questions.component';
import { TimeFormatPipe } from 'src/app/pips/time-format.pipe';


@NgModule({
  declarations: [
    ViewExamsComponent,
    ExamCodeComponent,
    ExamInstructionsComponent,
    ExamComponent,
    QuestionsComponent,
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    UserExamRoutingModule,
    FormsModule
  ]
})
export class UserExamModule { }
