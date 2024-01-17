import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RoleHomePageComponent } from './role-home-page/role-home-page.component';
import { RolePageHeaderComponent } from './role-page-header/role-page-header.component';


@NgModule({
  declarations: [
    SidebarComponent,
    RoleHomePageComponent,
    RolePageHeaderComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
