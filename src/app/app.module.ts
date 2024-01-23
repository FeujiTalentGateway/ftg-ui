import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, NgFor } from '@angular/common';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './utils/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    MainHeaderComponent,
    SidebarComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
