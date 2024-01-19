import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HeaderComponent } from './header/header.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    HeaderComponent,
    MainHomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HomeRoutingModule],
  exports: [HeaderComponent]
})
export class HomeModule {}
