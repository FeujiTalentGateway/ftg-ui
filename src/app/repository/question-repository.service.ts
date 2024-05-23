import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionRepository {
  baseUrl: string = environment.adminUrl;
  pythonUrl: string = environment.pythonUrl;
  authTokenKey: string = environment.authTokenKey;

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<Question[]> {
    let token = localStorage.getItem(this.authTokenKey);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Question[]>(
      `${this.baseUrl}question/`,
      requestOptions
    );
  }
  getQuestionsBySubject(subjectId: number): Observable<Question[]> {
    let token = localStorage.getItem(this.authTokenKey);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Question[]>(
      // `${this.baseUrl}question/subject/${subjectId}`,
      `${this.pythonUrl}/api/questions/${subjectId}/`,
      requestOptions
    );
  }

  getQuestionBYId(id: number): Observable<Question> {
    let token = localStorage.getItem(this.authTokenKey);
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
    let token = localStorage.getItem(this.authTokenKey);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };

    return this.http.post(this.baseUrl + 'question/', question, requestOptions);
  }
  editQuestion(question: Question) {
    let token = localStorage.getItem(this.authTokenKey);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.put(`${this.baseUrl}question/`, question, requestOptions);
  }
  deleteQuestion(id: number) {
    let token = localStorage.getItem(this.authTokenKey);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.delete(
      `${this.baseUrl}question/deactivate/${id}`,
      requestOptions
    );
  }
  getAllQuestionsBySubjectId(
    subjectId: number,
    page: number,
    pageSize: number
  ): Observable<any> {
    const token = localStorage.getItem(this.authTokenKey);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    const requestOptions = {
      headers: headers,
      params: params,
    };
    return this.http.get<any>(
      `${this.pythonUrl}api/questions/${subjectId}/`,
      requestOptions
    );
  }
  filterQuestionsBasedOnDifficultyLevel(
    subjectId: number,
    difficultyLevel: number,
    page: number,
    pageSize: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('difficultyLevel', difficultyLevel.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.pythonUrl}api/questions/${subjectId}/`, {
      params,
    });
  }
  filterQuestionsBasedOnSearchQuery(
    subjectId: number,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('content', searchQuery)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${this.pythonUrl}api/questions/${subjectId}/`, {
      params,
    });
  }
  filterQuestionsBasedOnDifficultyLevelWithSearchQuery(
    subjectId: number,
    difficultyLevel: number,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('content', searchQuery)
      .set('difficultyLevel', difficultyLevel.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.pythonUrl}api/questions/${subjectId}/`, {
      params,
    });
  }
}
