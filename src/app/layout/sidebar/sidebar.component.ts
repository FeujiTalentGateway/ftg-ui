import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-items';
import { RouteInfo } from './sidebar-metadata';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  listOfRoutes: RouteInfo[] = [];
  roles: string[] = [];
  activeRoute: any;

  constructor(
    private userDetail: UserdetailsService,
    private auth: AuthService
  ) {
    this.loadMenu();
  }

  ngOnInit(): void {
    this.roles = sessionStorage.getItem('roles')?.split(',') as string[];
    console.log(sessionStorage.getItem('roles'));
    console.log(this.roles, '------------------roles');

    // this.roles = this.auth.roles;
    // this.roles = this.auth.printRoleFromToken();
    // this.roles = this.roles.map((e) => e.authority);
    // console.log(this.roles); //['ADMIN','USER]

    if (this.roles) {
      this.listOfRoutes = ROUTES.filter((item) => {
        // Check if any role in item.role array matches with roles array
        return item.role.some((role) =>
          this.roles.includes(role.toUpperCase())
        );
      });

      // Output the filtered list
      console.log(this.listOfRoutes);
    }
  }

  toggleSubmenu(route: RouteInfo): void {
    route.active = !route.active;
  }
  loadMenu() {
    this.roles = localStorage.getItem('roles')?.split(',') as string[];
    console.log(localStorage.getItem('roles'));
    if (this.roles) {
      this.listOfRoutes = ROUTES.filter((item) => {
        // Check if any role in item.role array matches with roles array
        return item.role.some((role) =>
          this.roles.includes(role.toUpperCase())
        );
      });

      // Output the filtered list
      console.log(this.listOfRoutes);
    }
  }

  isActiveDropdown(activeModule: string) {}
  
  toggleActiveRoute(route: any) {
    if (this.activeRoute === route) {
      this.activeRoute = null; // Deactivate the route if it's already active
    } else {
      this.activeRoute = route; // Activate the clicked route
    }
  }
}
