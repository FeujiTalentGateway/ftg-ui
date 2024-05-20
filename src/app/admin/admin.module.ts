import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile/profile.component';

@NgModule({
  declarations: [

  
    AdminHomeComponent,
    HomeComponent,
    CodeSnippetComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HighchartsChartModule,
    FormsModule
  ],
  exports:[
    CodeSnippetComponent
  ]
})
export class AdminModule { }
