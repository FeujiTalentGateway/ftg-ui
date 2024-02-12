import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { Error400Component } from './error400/error400.component';
import { Error401Component } from './error401/error401.component';
import { Error500Component } from './error500/error500.component';
import { Error403Component } from './error403/error403.component';
import { Error409Component } from './error409/error409.component';
import { Error404Component } from './error404/error404.component';


@NgModule({
  declarations: [
    Error400Component,
    Error401Component,
    Error500Component,
    Error403Component,
    Error409Component,
    Error404Component
  ],
  imports: [
    CommonModule,
    ErrorPagesRoutingModule
  ]
})
export class ErrorPagesModule { }
