import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  
  constructor(private el: ElementRef, private auth :AuthService, private route : Router) {}
  @Input() userData: any;
  @Input() dummydata:any;

  showDropdown:boolean = true;
  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
    console.log("ok");
    
    
  }
  logOut(){
    this.auth.removeJwtTocken();
    this.route.navigateByUrl('/home')
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
