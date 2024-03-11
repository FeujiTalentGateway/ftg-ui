import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  userData: User = new User();
  userName: any;
  layoutCollapsed: boolean = false;
  userName$ = new Observable<string>();
  constructor(private userDetails: UserdetailsService) {}
  ngOnInit(): void {
    this.userName$ = this.userDetails.getUserNameFromToken();
    this.userName$.subscribe(
      (response) => {
        // localStorage.setItem('userName', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleLayout() {
    this.layoutCollapsed = !this.layoutCollapsed;
  }
}
