import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ring } from 'ldrs';
import { TokenInterceptor } from './TokenInterceptor/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { UserExamLayoutComponent } from './layout/app-layout/user-exam-layout/user-exam-layout.component';
import { ExamHeaderComponent } from './layout/exam-header/exam-header.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedDataService } from './services/shared-data.service';
import { ConfirmationDialogComponent } from './utils/confirmation-dialog/confirmation-dialog.component';

import { SharedModuleModule } from './shared-module/shared-module.module';
import { ConfirmDialogforuserComponent } from './utils/confirm-dialogforuser/confirm-dialogforuser.component';
import { MassageboxComponent } from './utils/massagebox/massagebox.component';
import { NgxUiLoaderModule,  NgxUiLoaderConfig} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#f3752e', 
  fgsType: 'ball-spin-clockwise', 
  pbColor: 'transparent',
  pbDirection: 'ltr', 
  pbThickness: 0, 

};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    MainHeaderComponent,
    SidebarComponent,
    ConfirmationDialogComponent,
    UserExamLayoutComponent,
    ExamHeaderComponent,
    ConfirmDialogforuserComponent,
    MassageboxComponent,
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
    MatDialogModule,
    SharedModuleModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    SharedDataService,
    Location,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
