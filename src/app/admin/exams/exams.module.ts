import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExamsRoutingModule } from './exams-routing.module';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEditSubjectComponent } from './add-edit-subject/add-edit-subject.component';
import { TruncatePipe } from './custom-pipes/truncate.pipe';
import { ExamUserComponent } from './exam-user/exam-user.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';

@NgModule({
  declarations: [
    ViewExamsComponent,
    ScheduleExamComponent,
    TruncatePipe,
    AddEditSubjectComponent,
    ViewSubjectsComponent,
    ExamUserComponent
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
    MatTooltipModule,
  ],
})
export class ExamsModule {}
