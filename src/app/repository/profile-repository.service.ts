import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileRepositoryService {
  baseUrl: string = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'profile');
  }
}
