import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/userProfile';
import { AuthRepositoryService } from 'src/app/repository/auth-repository.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {

  userProfile: UserProfile | undefined;
  userName :string | undefined;

  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private route: Router,
    private authRepo : AuthRepositoryService
  ) {}

  ngOnInit(): void {
   this.loadUserProfile();
  }
  
  @Input() userData: any;
  @Output() toggleLayout = new EventEmitter<void>();

  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log('ok');
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

    
 
  loadUserProfile(): void {
    this.authRepo.getUserProfile().subscribe(
      (data: UserProfile) => {
        console.log(data);
        
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
