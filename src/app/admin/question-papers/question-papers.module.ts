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
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CodingQuestionComponent } from './coding-question/coding-question.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    ViewPapersComponent,
    CreatePaperComponent,
    ViewQuestionsComponent,
    AddEditQuestionComponent,
    CodingQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionPapersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule

  ],
})
export class QuestionPapersModule {}
