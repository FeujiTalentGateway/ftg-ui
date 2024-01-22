import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

import { ScheduleExamComponent } from './schedule-exam/schedule-exam.component'; 
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreatePaperComponent } from './paper/create-paper/create-paper.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [{ path: 'sidebar', component: SidebarComponent },
{ path: '', redirectTo: '/admin/home', pathMatch: 'full' },
{ path: 'home', component: AdminHomeComponent },
{ path: 'header', component: AdminHeaderComponent },

{
  path: 'schedule-exam' , component: ScheduleExamComponent
},
{ path: 'paper', component: CreatePaperComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
