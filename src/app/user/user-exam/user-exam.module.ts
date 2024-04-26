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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { QuestionNavigationComponent } from './question-navigation/question-navigation.component';
import { CodingQuestionsComponent } from './coding-questions/coding-questions.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { TestCasesComponent } from './test-cases/test-cases.component';
import { TestResultPopupComponent } from './test-result-popup/test-result-popup.component';
import { MatIconModule } from '@angular/material/icon';


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
    QuestionNavigationComponent,
    CodingQuestionsComponent,
    CodeEditorComponent,
    TestCasesComponent,
    TestResultPopupComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    UserExamRoutingModule,
    FormsModule,
    SharedModuleModule,
    MatIconModule
  ],
})
export class UserExamModule {}
