import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component';
import { ViewExamsComponent } from './view-exams/view-exams.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component';
import { AddEditSubjectComponent } from './add-edit-subject/add-edit-subject.component';

const routes: Routes = [
  { path: 'scheduleExam', component: ScheduleExamComponent },
  { path: 'viewExams', component: ViewExamsComponent },
  { path: 'viewSubjects', component: ViewSubjectsComponent },
  { path: 'addEditSubject', component: AddEditSubjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamsRoutingModule { }
