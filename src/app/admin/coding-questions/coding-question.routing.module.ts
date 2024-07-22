import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingQuestionComponent } from './coding-question/coding-question.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';

const routes: Routes = [
  { path: 'viewQuestions', component: ViewQuestionsComponent },
//   { path: 'scheduleExam', component: CodingQuestionListComponent },
{ path: 'action', component: CodingQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingQuestionRoutingModule { }
