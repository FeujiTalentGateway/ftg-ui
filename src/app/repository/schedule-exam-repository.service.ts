import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamRepositoryService {

  updateExam(formData: any, selectedExamId: any) {

    const requestOptions = { headers: this.setToken() };
  
    return this.http.put(this.adminUrl + 'exam/'+selectedExamId, formData, requestOptions);
  }

  adminUrl = 'http://localhost:8093/';

  constructor(private http: HttpClient) { }

  setToken(): HttpHeaders {
    // Get the JWT token from wherever you store it (localStorage, a service, etc.)
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  scheduleExam(formData: Exam): Observable<any> {
    const requestOptions = { headers: this.setToken() };
  
    return this.http.post(this.adminUrl + 'exam/schedule', formData, requestOptions);
  }
  



  getExams(): Observable<any> {

    const requestOptions = { headers: this.setToken() };

    // Make the HTTP request
    return this.http.get(this.adminUrl+'exam/getExams', requestOptions);
  }


  changeStatus(id: any, active: any): Observable<any>  {
    const requestOptions = { headers: this.setToken() };
    console.log("change status");
    
   return  this.http.delete( this.adminUrl + 'exam/changestatus/'+ id, requestOptions);
 
  }
  


}
