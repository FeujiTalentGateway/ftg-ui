import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminModule } from '../admin.module';
import { AddEditQuestionComponent } from './add-edit-question/add-edit-question.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';
import { QuestionPapersRoutingModule } from './question-papers-routing.module';
import { ViewPapersComponent } from './view-papers/view-papers.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    // Other imports
    MatProgressSpinnerModule,
  ],
  // Other module configurations
})
export class AppModule {}

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
    MatSelectModule,
    MatProgressSpinnerModule,
    AdminModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class QuestionPapersModule {}
