import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleHomePageComponent } from './role-home-page/role-home-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RolePageHeaderComponent } from './role-page-header/role-page-header.component';

const routes: Routes = [{ path: 'home', component: RoleHomePageComponent },
                        { path: 'sidebar', component: SidebarComponent },
                        { path: 'roleHeader', component: RolePageHeaderComponent }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
