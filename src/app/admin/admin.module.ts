import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CodeSnippetComponent } from './code-snipet/code-snipet.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  
    AdminHomeComponent,
    HomeComponent,
    CodeSnippetComponent,
    
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
