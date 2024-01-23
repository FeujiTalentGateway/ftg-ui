import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AllQuestionsComponent } from './question/all-questions/all-questions.component';
import { AddEditQuestionComponent } from './question/add-edit-question/add-edit-question.component';
import { AllSubjectsComponent } from './subject/all-subjects/all-subjects.component';
import { AddEditSubjectComponent } from './subject/add-edit-subject/add-edit-subject.component';

const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent },
  { path: 'home', component: AdminHomeComponent },
  { path: 'header', component: AdminHeaderComponent },
  { path: 'questions', component: AllQuestionsComponent },
  { path: 'questions/edit/:id', component: AddEditQuestionComponent },
  { path: 'addquestion', component: AddEditQuestionComponent },
  { path: 'subjects', component: AllSubjectsComponent },
  { path: 'subjects/edit/:id', component: AddEditSubjectComponent },
  { path: 'addsubjects', component: AddEditQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
