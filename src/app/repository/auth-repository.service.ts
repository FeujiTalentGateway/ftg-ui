import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLoginModel } from '../models/user-login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  baseUrl: string = environment.apiUrl;
  authTokenKey: string = environment.authTokenKey;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  register(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'registration/register', data);
  }

  login(loginData: UserLoginModel): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login', loginData);
  }
  sendOtpToEmail(email: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.baseUrl}account/generate-otp/${email}`, { observe: 'response' });
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

  getUserByRoleName(roleName: string): Observable<User[]> {
    let token = localStorage.getItem(this.authTokenKey);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<User[]>(
      `${this.baseUrl}user/role/${roleName}`,
      requestOptions
    );
  }
}
