import { Component, OnInit } from '@angular/core';
import { ProfileRepositoryService } from 'src/app/repository/profile-repository.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {}; // Object to hold profile data

  constructor(private profileService: ProfileRepositoryService) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = data;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}
