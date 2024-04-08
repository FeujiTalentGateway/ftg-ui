import { Component, ElementRef, EventEmitter, HostListener, Input, Output ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {
  userName :string | undefined;

  constructor(
    private el: ElementRef,
    private auth: AuthService,
    private route: Router
  ) {}
  ngOnInit(): void {
   this.userName = localStorage.getItem('userName') as string
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
}
