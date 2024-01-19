import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamRepositoryService {

  scheduleExam(formData:Exam):Observable<any> {

        // Get the JWT token from wherever you store it (localStorage, a service, etc.)
        const token = localStorage.getItem('token');

        // Set the Authorization header with the token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        const requestOptions = {
          headers: headers
        };

        return this.http.post(this.adminUrl+'exam/schedule',formData, requestOptions);
    
  }

  adminUrl = 'http://localhost:8093/';

  constructor(private http: HttpClient) { }

  getExams(): Observable<any> {
    // Get the JWT token from wherever you store it (localStorage, a service, etc.)
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const requestOptions = {
      headers: headers
    };

    // Make the HTTP request
    return this.http.get(this.adminUrl + 'exam/getExams', requestOptions);
  }


}
