import { Injectable } from '@angular/core';
import { UserLoginModel } from '../models/user-login.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  register(data: any): Observable<any> {
    console.log('Inside auth repo: register()');
    console.log(this.baseUrl);

    return this.http.post(this.baseUrl + 'registration/register', data);
  }

  login(loginData: UserLoginModel): Observable<any> {
    console.log('Inside auth repo: login()');
    return this.http.post(this.baseUrl + 'auth/login', loginData);
  }
  sendOtpToEmail(email: string): Observable<any> {  
    return this.http.get(
      this.baseUrl + 'account/generate-otp/' + email,
      { observe: 'response' }
    );
  }
  setPasswordRequestForForgotPassword(
    forgotPasswordRequest: any,
    options: any
  ) { 
    return this.http.put(
      this.baseUrl + 'account/forgot-password',
      forgotPasswordRequest,
      options
    );
  }
}
