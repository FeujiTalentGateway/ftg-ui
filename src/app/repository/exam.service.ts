import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';
import { Paper } from '../models/paper';
import { OptionAttempt } from '../models/option.attempt';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  examUrl: string = ' http://127.0.0.1:8000/';
  javaExamUrl: string = 'http://localhost:8093/exam';
  constructor(private http: HttpClient) {}

  getPaperByExamCode(examCode: string): Observable<Paper> {
    return this.http.get<Paper>(
      `${this.examUrl}exam/take-exam/${examCode}/`,
    );
  }

  checkExamByCode(examCode: string): Observable<any> {
    const url = `${this.javaExamUrl}/by-code`;
    const params = { examCode: examCode };
    return this.http.get(url, { params });
  }

  getStaticData(): Observable<any[]> {
    return this.http.get<any[]>('/assets/static_data/listOfExams.json');
  }

  getStaticQuestionPaper(): Observable<Paper> {
    return this.http.get<Paper>('/assets/static_data/paper.json');
  }
  saveOption(optionAttempt: OptionAttempt):Observable<any>{
    return this.http.post(`${this.examUrl}exam/save-options/`,optionAttempt)
  }

  checkExamCodeWithDetail(examCode: string): Observable<any> {
    let data = {
      'is_checking':true
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'is_checking':'true'
      }),
      body: data,
    };

    // Make a GET request with the provided data in the body
    return this.http.get<any>(`${this.examUrl}exam/take-exam/${examCode}/`, options);
  }

}
