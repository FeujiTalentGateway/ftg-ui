import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [{ path: 'sidebar', component: SidebarComponent },
{ path: 'home', component: AdminHomeComponent },
{ path: 'header', component: AdminHeaderComponent },
{ path: 'sample', component: SampleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
