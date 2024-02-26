import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [

  
    AdminHomeComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HighchartsChartModule
  ]
})
export class AdminModule { }
