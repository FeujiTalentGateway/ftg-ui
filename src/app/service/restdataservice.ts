
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class RestDataService {
    constructor(private http:HttpClient) { }
    baseurl:string='http://3.110.151.104:8092';
    register(data: any): Observable<any> {
    console.log('Inside auth repo: register()');
    console.log(this.baseurl);
    
    return this.http.post(this.baseurl + '/registration/register', data);
  }
}  
