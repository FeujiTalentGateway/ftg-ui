import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserHomePageComponent,],
  imports: [CommonModule, UserRoutingModule,FormsModule],
})
export class UserModule {}
