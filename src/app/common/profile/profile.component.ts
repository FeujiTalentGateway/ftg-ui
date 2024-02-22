import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/userProfile';
import { AuthRepositoryService } from 'src/app/repository/auth-repository.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userProfile: UserProfile | undefined;

  ngOnInit(): void {
    this.loadUserProfile();
   }

   constructor(private authRepo:AuthRepositoryService){

   }

   loadUserProfile(): void {
    this.authRepo.getUserProfile().subscribe(
      (data: UserProfile) => {
        console.log(data);
        console.log("profile");
        
        
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

}
