import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private route : ActivatedRoute) {}

  ngOnInit() {}

  isAboutPage(): boolean {
    return this.route.snapshot.url[0]?.path === 'about';
  }

  isContactPage(): boolean {
    return this.route.snapshot.url[0]?.path === 'contact';
  }
  isHomePage(): boolean {
    return this.route.snapshot.url[0]?.path === 'home';
  }
  isSignupPage(): boolean {
    return this.route.snapshot.url[0]?.path === 'register';
  }

  isLoginPage(): boolean {
    return this.route.snapshot.url[0]?.path === 'login';
  }
}
