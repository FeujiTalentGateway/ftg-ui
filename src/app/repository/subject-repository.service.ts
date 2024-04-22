import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectRepositoryService {
  baseUrl: string = environment.adminUrl;

  constructor(private http: HttpClient) {}
  getAllSubjectsByActiveStatus(isActive: boolean): Observable<Subject[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    console.log('In restful service');
    return this.http.get<Subject[]>(
      this.baseUrl + 'subject/active-status/' + isActive,
      requestOptions
    );
  }

  getAllSubjects(): Observable<Subject[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    console.log('In restful service');
    return this.http.get<Subject[]>(this.baseUrl + 'subject/', requestOptions);
  }
  deleteSubject(id: number) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.delete(
      `${this.baseUrl}subject/deactivate/${id}`,
      requestOptions
    );
  }
  getSubjectById(id: number): Observable<Question> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Question>(
      `${this.baseUrl}subject/${id}`,
      requestOptions
    );
  }

  addSubject(subject: Subject) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };

    return this.http.post(this.baseUrl + 'subject/', subject, requestOptions);
  }
  editSubject(subject: Subject) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.put(`${this.baseUrl}subject/`, subject, requestOptions);
  }

  activateSubject(subjectId: number) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };

    return this.http.post(
      this.baseUrl + 'subject/activate/' + subjectId,
      {},
      requestOptions
    );
  }
}
