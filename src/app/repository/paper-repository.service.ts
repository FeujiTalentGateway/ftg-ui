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
  baseUrl: string = environment.paperUrl;

  constructor(private http: HttpClient) {

  }
  getAllPapers() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get(this.baseUrl + 'paper/getallpapers', requestOptions)
  }

  savePaper(paper: Paper):Observable<Paper> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.post<Paper>(this.baseUrl + 'paper/savepaper', paper, requestOptions)
  }

  updatePaper(paper: Paper) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.put(this.baseUrl + 'paper/update', paper, requestOptions)
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

  getAllQuestions():Observable<Question[]> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<Question[]>(this.baseUrl + 'question/', requestOptions)
  }




}
