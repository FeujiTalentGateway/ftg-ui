import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodingQuestionRoutingModule } from './coding-question.routing.module';
import { CodingQuestionActionsComponent } from './coding-question-actions/coding-question-actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminModule } from '../admin.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    CodingQuestionActionsComponent
  ],
  imports: [
    CommonModule,
    CodingQuestionRoutingModule, CommonModule,
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
  ]
})
export class CodingQuestionModule { }
