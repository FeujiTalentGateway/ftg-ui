import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-items';
import { RouteInfo } from './sidebar-metadata';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  listOfRoutes: RouteInfo[] = [];

  constructor() {}

  ngOnInit(): void {
    // let role = localStorage.getItem('role') || 'user';
    let role = 'Admin';
    // let role = 'invigilator';
    if (role != null) {
      this.listOfRoutes = ROUTES.filter((item) => item.role.includes(role));
      // this.listOfRoutes.forEach((route) => (route.active = false));
    }
  }

  toggleSubmenu(route: RouteInfo): void {
    route.active = !route.active;
  }

  isActiveDropdown(activeModule: string) {
  }
}
