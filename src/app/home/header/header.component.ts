import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showButtons: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {}

  isSignupPage(): boolean {
    return (
      this.router.isActive('/main/register', true) &&
      this.router.url === '/main/register'
    );
  }
  isHomePage(): boolean {
    return (
      this.router.isActive('/main/home', true) &&
      this.router.url === '/main/home'
    );
  }
  isLoginPage(): boolean {
    return (
      this.router.isActive('/main/login', true) &&
      this.router.url === '/main/login'
    );
  }
  isContactPage(): boolean {
    return (
      this.router.isActive('/main/contact', true) &&
      this.router.url === '/main/contact'
    );
  }
  isAboutPage(): boolean {
    return (
      this.router.isActive('/main/about', true) &&
      this.router.url === '/main/about'
    );
  }
  isForgotPasswordPage(): boolean {
    return (
      this.router.isActive('/main/forgot-password', true) &&
      this.router.url === '/main/forgot-password'
    );
  }
  isResetPasswordPage(): boolean {
    return (
      this.router.isActive('/main/reset-password', true) &&
      this.router.url === '/main/reset-password'
    );
  }
  
}
