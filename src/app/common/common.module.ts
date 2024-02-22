import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common'; 
import { ProfileComponent } from './profile/profile.component';
import { CommonRoutingModule } from './common.routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    AngularCommonModule,
    CommonRoutingModule,
    MatCardModule,
    MatIconModule

  ]
})
export class CustomCommonModule { } 
