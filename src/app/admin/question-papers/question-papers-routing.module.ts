import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { ViewPapersComponent } from './view-papers/view-papers.component';

const routes: Routes = [{ path: 'addQuestions', component: AddQuestionsComponent },
{ path: 'viewQuestions', component: ViewQuestionsComponent },
{ path: 'createPaper', component: CreatePaperComponent },
{ path: 'viewPapers', component: ViewPapersComponent },
{ path: 'addEditQuestion', component: AddEditQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionPapersRoutingModule { }
