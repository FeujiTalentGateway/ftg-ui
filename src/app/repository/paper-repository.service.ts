import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paper } from '../models/paper';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class PaperRepositoryService {
  baseUrl: string = environment.adminUrl;

  constructor(private http: HttpClient) {

  }



  getAllPapers(): Observable<Paper[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Paper[]>(this.baseUrl + 'paper/', requestOptions)
  }

  savePaper(paper: Paper): Observable<Paper> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.post<Paper>(this.baseUrl + 'paper/', paper, requestOptions);
  }

  updatePaper(paper: Paper): Observable<Paper> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    console.log(paper);
    return this.http.put<Paper>(this.baseUrl + 'paper/', paper, requestOptions)
  }
  getPaperById(id: number) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get(this.baseUrl + 'paper/' + id, requestOptions);

  }


  getAllSubjects(): Observable<Subject[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Subject[]>(this.baseUrl + 'subject/', requestOptions);
  }





  // question urls

  getAllQuestions(): Observable<Question[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Question[]>(this.baseUrl + 'question/', requestOptions)
  }




}
