import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataType } from '../models/coding.datatype.model';

@Injectable({
  providedIn: 'root'
})
export class CodingQuestionRepositoryService {
  javaUrl: string = environment.adminUrl;

  constructor(private http: HttpClient) { }

  getDataTypes():Observable<DataType[]>{
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.get<DataType[]>(
      `${this.javaUrl}datatype/`,
      requestOptions
    );
  }

  saveCodingQuestion(){
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let requestOptions = {
      headers: headers,
    };
    return this.http.post(this.javaUrl + 'codingquestion/',requestOptions)
  }
}
