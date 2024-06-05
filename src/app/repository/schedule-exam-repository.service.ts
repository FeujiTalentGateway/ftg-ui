import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleExamRepositoryService {
  adminUrl = environment.adminUrl;
  authTokenKey: string = environment.authTokenKey;

  constructor(private http: HttpClient) {}

  setToken(): HttpHeaders {
    // Get the JWT token from wherever you store it (localStorage, a service, etc.)
    const token = localStorage.getItem(this.authTokenKey);

    // Set the Authorization header with the token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  scheduleExam(formData: Exam): Observable<HttpResponse<any>> {
    const requestOptions = { headers: this.setToken() };

    return this.http.post(this.adminUrl + 'exam/schedule-exam', formData, {
      ...requestOptions,
      observe: 'response',
    });
  }

  getExams(): Observable<HttpResponse<any>> {
    const requestOptions = { headers: this.setToken() };

    // Make the HTTP request
    return this.http.get(this.adminUrl + 'exam/list', {
      ...requestOptions,
      observe: 'response',
    });
  }
  getStaticExams(): Observable<HttpResponse<any>> {
    const requestOptions = { headers: this.setToken() };

    // Make the HTTP request
    return this.http.get(this.adminUrl + 'exam', {
      ...requestOptions,
      observe: 'response',
    });
  }

  changeExamStatus(id: any) {
    const requestOptions = { headers: this.setToken() };

    return this.http.post(this.adminUrl + 'exam/change-status/' + id, {
      ...requestOptions,
      observe: 'response',
    });
  }

  updateExam(formData: Exam): Observable<HttpResponse<any>> {
    const requestOptions = { headers: this.setToken() };

    return this.http.put<any>(this.adminUrl + 'exam/update-exam', formData, {
      ...requestOptions,
      observe: 'response',
    });
  }

  getExamById(examId: number): Observable<Exam> {
    const requestOptions = { headers: this.setToken() };

    // Make the HTTP request
    return this.http.get<Exam>(`${this.adminUrl}exam/${examId}`, {
      ...requestOptions,
    });
  }
}
