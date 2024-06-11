import { Component } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.css']
})
export class GithubLoginComponent {
 
  constructor(private githubService :GithubService) {
    
  }
  loginWithGitHub(){
    this.githubService.signInWithGitHub();
  }
}
