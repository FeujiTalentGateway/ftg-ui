import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionRepository {
  baseUrl: string = environment.adminUrl;

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<Question[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    console.log('In restful service');
    return this.http.get<Question[]>(
      `${this.baseUrl}question/`,
      requestOptions
    );
  }
  getQuestionsBySubject(subjectId: number): Observable<Question[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    console.log('In restful service');
    return this.http.get<Question[]>(
      `${this.baseUrl}question/subject/${subjectId}`,
      requestOptions
    );
  }

  getQuestionBYId(id: number): Observable<Question> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Question>(
      `${this.baseUrl}question/${id}`,
      requestOptions
    );
  }
  addQuestion(question: Question) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };

    return this.http.post(this.baseUrl + 'question/', question, requestOptions);
  }
  editQuestion(question: Question) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.put(`${this.baseUrl}question/`, question, requestOptions);
  }
  deleteQuestion(id: number) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.delete(
      `${this.baseUrl}question/deactivate/${id}`,
      requestOptions
    );
  }
}
