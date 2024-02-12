import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error400Component } from './error400/error400.component';
import { Error401Component } from './error401/error401.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error409Component } from './error409/error409.component';
import { Error500Component } from './error500/error500.component';

const routes: Routes = [
  {
    path: '400',
    component: Error400Component,
  },
  {
    path: '401',
    component: Error401Component,
  },
  {
    path: '403',
    component: Error403Component,
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '409',
    component: Error409Component,
  },
  {
    path: '500',
    component: Error500Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule {}
