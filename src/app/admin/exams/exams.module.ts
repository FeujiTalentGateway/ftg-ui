import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamsRoutingModule } from './exams-routing.module';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './custom-pipes/truncate.pipe';
import { AddEditSubjectComponent } from './add-edit-subject/add-edit-subject.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';

@NgModule({
  declarations: [
    ViewExamsComponent,
    ScheduleExamComponent,
    TruncatePipe,
    AddEditSubjectComponent,
    ViewSubjectsComponent,
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
})
export class ExamsModule {}
