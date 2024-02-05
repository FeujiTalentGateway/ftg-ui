import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamRepositoryService {

  adminUrl = 'http://localhost:8093/';

  constructor(private http: HttpClient) { }

  setToken(): HttpHeaders {
    // Get the JWT token from wherever you store it (localStorage, a service, etc.)
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  scheduleExam(formData: Exam): Observable<HttpResponse<any>> {
    const requestOptions = { headers: this.setToken() };
  
    return this.http.post(this.adminUrl + 'exam', formData,{ ...requestOptions, observe: 'response' });
  }
  



  getExams(): Observable<HttpResponse<any>> {

    const requestOptions = { headers: this.setToken() };

    // Make the HTTP request
    return this.http.get(this.adminUrl+'exam', { ...requestOptions, observe: 'response' });
  }


  changeExamStatus(id: any): Observable<HttpResponse<any>>  {
    const requestOptions = { headers: this.setToken() };
    console.log("change status");
    
   return  this.http.delete( this.adminUrl + 'exam/'+ id, { ...requestOptions, observe: 'response' });
 
  }
  
  updateExam(formData: Exam): Observable<HttpResponse<any>> {
    const requestOptions = { headers: this.setToken() };

    return this.http.put<any>(this.adminUrl + 'exam', formData, { ...requestOptions, observe: 'response' });
  }



  


}