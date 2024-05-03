import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ViewUsersComponent } from './view-users/view-users.component';


@NgModule({
  declarations: [
    ViewUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    
  ]
})
export class UsersModule { }
