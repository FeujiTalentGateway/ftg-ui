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
    let role = localStorage.getItem('role') || 'user';
    if (role != null) {
      this.listOfRoutes = ROUTES.filter((item) => item.role.includes(role));
    }
  }

  isActiveDropdown(activeModule: string) {}
}
