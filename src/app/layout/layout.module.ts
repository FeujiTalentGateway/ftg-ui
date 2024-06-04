import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutRouterModule } from './layout-router.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRouterModule,
    MatSidenavModule,
    FormsModule,
    NgModule,
  ],
})
export class LayoutModule {}
