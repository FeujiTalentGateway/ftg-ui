import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionPapersRoutingModule } from './question-papers-routing.module';
import { QuestionPapersComponent } from './question-papers.component';
import { ViewPapersComponent } from './view-papers/view-papers.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';


@NgModule({
  declarations: [
    QuestionPapersComponent,
    ViewPapersComponent,
    CreatePaperComponent,
    ViewQuestionsComponent,
    AddQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionPapersRoutingModule
  ]
})
export class QuestionPapersModule { }
