import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighchartsChartModule } from 'highcharts-angular';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AdminHomeComponent, HomeComponent],
  imports: [CommonModule, AdminRoutingModule, HighchartsChartModule],
})
export class AdminModule {}
