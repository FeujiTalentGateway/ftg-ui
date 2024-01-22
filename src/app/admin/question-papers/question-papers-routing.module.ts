import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionPapersComponent } from './question-papers.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';

const routes: Routes = [{ path: 'addQuestions', component: AddQuestionsComponent },
{ path: 'viewQuestions', component: ViewQuestionsComponent },
{ path: 'createPaper', component: CreatePaperComponent },
{ path: 'viewPapers', component: ViewQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionPapersRoutingModule { }
