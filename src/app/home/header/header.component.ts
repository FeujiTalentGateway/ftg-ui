import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  isHomePage(): boolean {
    return this.router.isActive('/', true) && this.router.url === '/';
  }

  isAboutPage(): boolean {
    return this.router.isActive('/about', true) && this.router.url === '/about';
  }

  isContactPage(): boolean {
    return (
      this.router.isActive('/contact', true) && this.router.url === '/contact'
    );
  }
  isSignupPage(): boolean {
    return (
      this.router.isActive('/register', true) && this.router.url === '/register'
    );
  }

  isLoginPage(): boolean {
    return this.router.isActive('/login', true) && this.router.url === '/login';
  }
}
