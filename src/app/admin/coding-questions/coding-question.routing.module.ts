import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingQuestionActionsComponent } from './coding-question-actions/coding-question-actions.component';

const routes: Routes = [
//   { path: 'viewQuestions', component: CodingQuestionListComponent },
//   { path: 'scheduleExam', component: CodingQuestionListComponent },
{ path: 'action', component: CodingQuestionActionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingQuestionRoutingModule { }
