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

  // Function to check if the current route is the Signup page
  isSignupPage(): boolean {
    return (
      this.router.isActive('/main/register', true) && this.router.url === '/main/register'
    );
  }

  // Function to check if the current route is the Login page
  isLoginPage(): boolean {
    
    return this.router.isActive('/main/login', true) && this.router.url === '/main/login';
  }
}
