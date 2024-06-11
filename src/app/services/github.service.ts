import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserdetailsService } from './userdetails.service';
import { SnackBarService } from './snack-bar.service';
import { AuthService } from './auth.service';
import {
  GITHUB_REGISTRATION_URL,
  LOGIN_URL,
} from '../utils/CONSTANT/Api_constant';
import {
  GITHUB_CLIENT_ID,
  SOMETHING_WENT_WRONG,
  SUCCESSFULLY_LOGGED_IN,
} from '../utils/CONSTANT/String_constant';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private githubClientId = GITHUB_CLIENT_ID;
  private githubRedirectUri = LOGIN_URL;
  private githubScope = 'user';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private route: Router,
    private userDetails: UserdetailsService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  signInWithGitHub() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.githubClientId}&redirect_uri=${this.githubRedirectUri}&scope=${this.githubScope}`;
  }
  handleGitHubCallback(code: string) {
    const requestBody = {
      code: code,
    };
    localStorage.removeItem('Email-Token');
    this.ngxLoader.start();
    this.http.post<any>(GITHUB_REGISTRATION_URL, requestBody).subscribe({
      next: (response: any) => {
        this.ngxLoader.stop();
        if (response.message == SUCCESSFULLY_LOGGED_IN) {
          this.snackBar.openSnackBarSuccessMessage(
            SUCCESSFULLY_LOGGED_IN,
            'Close'
          );
          this.authService.setJwtToken(response.token);
          const userPayload = this.authService.decodedToken();
          localStorage.setItem('userName', userPayload.sub);
          this.userDetails.setUserNameFromToken(userPayload.sub);
          this.userDetails.setRoleFromToken(
            userPayload.authorities[0].authority
          );
          let roles: string[] = userPayload.authorities[0].authority;
          sessionStorage.setItem('roles', userPayload.authorities[0].authority);
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
          this.snackBar.openSnackBarForError(SOMETHING_WENT_WRONG, 'Close');
        }
      },
    });
  }
}
