import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserdetailsService } from './userdetails.service';
import { SnackBarService } from './snack-bar.service';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private githubClientId = 'Ov23liZTS3icPuM58Luz';
  private githubClientSecret = 'b260e09f4ec58ef93eac3376cc77c34857818489';
  private githubRedirectUri = 'http://localhost:4200/main/login';
  private githubScope = 'user';

  constructor(private http: HttpClient, private router: Router,private authService :AuthService,
    private snackBar: SnackBarService,
    private route: Router,
    private userDetails: UserdetailsService,
    private ngxLoader: NgxUiLoaderService,) {}

  signInWithGitHub() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.githubClientId}&redirect_uri=${this.githubRedirectUri}&scope=${this.githubScope}`;
    console.log(window.location.href);
  }
  private userPayload: any;
  handleGitHubCallback(code: string) {
    const requestBody = {
      code: code,
    };
    localStorage.removeItem('Email-Token');
    this.ngxLoader.start();
    this.http
      .post<any>('http://localhost:8000/registration/github/', requestBody)
      .subscribe({
        next: (response: any) => {
          this.ngxLoader.stop();
          if (response.message == 'Successfully logged in') {
            this.snackBar.openSnackBarSuccessMessage('Login successfully', 'Close');
            this.authService.setJwtToken(response.token);
            this.authService.decodedToken();
            localStorage.setItem('userName', this.userPayload.sub);
            this.userDetails.setUserNameFromToken(this.userPayload.sub);
            this.userDetails.setRoleFromToken(this.userPayload.authorities);
            let roles: string[] = this.userPayload.authorities.map(
              (e: { authority: any }) => e.authority
            );
            sessionStorage.setItem(
              'roles',
              this.userPayload.authorities.map(
                (e: { authority: any }) => e.authority
              )
            );
            if (roles.includes('USER')) {
              this.route.navigateByUrl('/user/exam/exam-code');
            } else {
              this.route.navigateByUrl('/admin/home');
            }
          }
        },
        error: (error: any) => {
          this.ngxLoader.stop();
          if (error.status === 400) {
            this.snackBar.openSnackBarForError(error.error.message, 'Close');
          } else {
            this.snackBar.openSnackBarForError('Something went wrong', 'Close');
          }
        },
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
