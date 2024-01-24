import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AddEditQuestionComponent } from './question/add-edit-question/add-edit-question.component';
import { AllQuestionsComponent } from './question/all-questions/all-questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddEditSubjectComponent } from './subject/add-edit-subject/add-edit-subject.component';
import { AllSubjectsComponent } from './subject/all-subjects/all-subjects.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Import MatSlideToggleModule

@NgModule({
  declarations: [
    AdminHomeComponent,
    SidebarComponent,
    AdminHeaderComponent,
    AddEditQuestionComponent,
    AllQuestionsComponent,
    AddEditSubjectComponent,
    AllSubjectsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    PaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
})
export class AdminModule {}
