import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-items';
import { RouteInfo } from './sidebar-metadata';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  listOfRoutes: RouteInfo[] = [];

  constructor(private userDetail: UserdetailsService) {}

  ngOnInit(): void {
    // let role  = localStorage.getItem('role') ||'user'
    let role = 'Admin';
    if (role) {
      this.listOfRoutes = ROUTES.filter((item) => item.role.includes(role));
    }
  }

  toggleSubmenu(route: RouteInfo): void {
    route.active = !route.active;
  }

  isActiveDropdown(activeModule: string) {
  }
}
