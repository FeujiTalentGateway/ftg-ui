import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserHomePageComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
