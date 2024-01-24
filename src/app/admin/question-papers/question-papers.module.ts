import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionPapersRoutingModule } from './question-papers-routing.module';
import { ViewPapersComponent } from './view-papers/view-papers.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ViewPapersComponent,
    CreatePaperComponent,
    ViewQuestionsComponent,
    AddEditQuestionComponent,
  ],
  imports: [
    CommonModule,
    QuestionPapersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    PaginatorModule,
    TooltipModule,
  ],
})
export class QuestionPapersModule {}
