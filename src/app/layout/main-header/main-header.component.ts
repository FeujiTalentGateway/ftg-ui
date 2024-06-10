import { Component, ElementRef, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleLoginService } from 'src/app/services/google-login.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  userName: string | undefined;
  profilePictureUrl: SafeUrl | null = null;

  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private route: Router,
    private googleLoginService: GoogleLoginService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') as string;
    const profileUrl = this.googleLoginService.getProfilePictureUrl();
    if (profileUrl) {
      this.profilePictureUrl = this.domSanitizer.bypassSecurityTrustUrl(profileUrl);
    }
  }

  @Input() userData: any;
  @Output() toggleLayout = new EventEmitter<void>();
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logOut() {
    this.auth.logout();
    this.route.navigateByUrl('/main/home');
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  onToggleLayout() {
    this.toggleLayout.emit();
  }

  getProfile() {
    if (this.auth.checkAdminRole()) {
      this.route.navigateByUrl('admin/profile');
    } else if (this.auth.checkUserRole()) {
      this.route.navigateByUrl('user/profile');
    }
  }
}
