import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AddEditSubjectComponent } from './add-edit-subject/add-edit-subject.component';
import { TruncatePipe } from './custom-pipes/truncate.pipe';
import { ExamUserComponent } from './exam-user/exam-user.component';
import { ExamsRoutingModule } from './exams-routing.module';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ViewExamDetailComponent } from './view-exam-detail/view-exam-detail.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';
import { IgxTimePickerModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    ViewExamsComponent,
    ScheduleExamComponent,
    TruncatePipe,
    AddEditSubjectComponent,
    ViewSubjectsComponent,
    ExamUserComponent,
    ViewExamDetailComponent,
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
    MatCardModule,
    NgxMaterialTimepickerModule,
    IgxTimePickerModule,
  ],
})
export class ExamsModule {}
