import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';

import { DatePipe } from '@angular/common';

import { AddEditSubjectComponent } from './add-edit-subject/add-edit-subject.component';
import { ExamUserComponent } from './exam-user/exam-user.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';

const routes: Routes = [
  { path: 'scheduleExam', component: ScheduleExamComponent },
  { path: 'viewExams', component: ViewExamsComponent },
  { path: 'viewSubjects', component: ViewSubjectsComponent },
  { path: 'addEditSubject', component: AddEditSubjectComponent },
  { path: 'exam-users', component: ExamUserComponent },
  {
    path: 'scheduleExam/:id',
    component: ScheduleExamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe],
})
export class ExamsRoutingModule {}
