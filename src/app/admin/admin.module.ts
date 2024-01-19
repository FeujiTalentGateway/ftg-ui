import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SampleComponent } from './sample/sample.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    AdminHomeComponent,
    SidebarComponent,
    AdminHeaderComponent,
    SampleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule
  ]
})
export class AdminModule { }
