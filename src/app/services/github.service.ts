import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private githubClientId = 'Ov23liZTS3icPuM58Luz';
  private githubClientSecret = 'b260e09f4ec58ef93eac3376cc77c34857818489';
  private githubRedirectUri = 'http://localhost:4200/main/login';
  private githubScope = 'user';

  constructor(private http: HttpClient, private router: Router) {}

  signInWithGitHub() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.githubClientId}&redirect_uri=${this.githubRedirectUri}&scope=${this.githubScope}`;
    console.log(window.location.href);
  }

  handleGitHubCallback(code: string) {
    const requestBody = {
      code: code,
    };

    console.log(requestBody);

    this.http
      .post<any>('http://localhost:8000/api/github-auth/', requestBody)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error('Error during GitHub authentication:', error);
        }
      );
  }

  getUserInfo(accessToken: string) {
    this.http
      .get<any>('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
      .subscribe((user) => {
        localStorage.setItem('github-user', JSON.stringify(user));
        this.router.navigate(['/home']);
      });
  }

  signOutGitHub() {
    localStorage.removeItem('github-user');
    this.router.navigate(['/login']);
  }
}
