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
  baseurl: string = 'http://13.127.117.155:8092';
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  register(data: any): Observable<any> {
    console.log('Inside auth repo: register()');
    console.log(this.baseurl);

    return this.http.post(this.baseurl + '/registration/register', data);
  }

  login(loginData: UserLoginModel): Observable<any> {
    console.log('Inside auth repo: login()');
    // Send a POST request to the login endpoint with login data
    return this.http.post(this.baseUrl + 'auth/login', loginData);
  }
}
