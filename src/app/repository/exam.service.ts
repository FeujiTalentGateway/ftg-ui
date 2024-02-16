import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';
import { Paper } from '../models/paper';
import { OptionAttempt } from '../models/option.attempt';
import { ViewResult } from '../models/view-reult';
import { ExamStatsModel } from '../models/exam.stats.model';
import { UsersResult } from '../models/users.result.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  
  examUrl: string = ' http://127.0.0.1:8000/';
  javaExamUrl: string = 'http://localhost:8093/exam';
  constructor(private http: HttpClient) {}

  getPaperByExamCode(examCode: string): Observable<Paper> {
    return this.http.post<Paper>(`${this.examUrl}exam/take-exam/${examCode}/`,{});
  }

  checkExamByCode(examCode: string): Observable<any> {
    const url = `${this.javaExamUrl}/by-code`;
    const params = { examCode: examCode };
    return this.http.get(url, { params });
  }

  
  getStaticData(): Observable<any[]> {
    return this.http.get<any[]>('/assets/static_data/listOfExams.json');
  }


  getStaticExamData(): Observable<any[]> {
    return this.http.get<any[]>('/assets/static_data/listOfExams.json');
  }

  getExamData(examCode :string): Observable<Exam> {
    const url = `${this.javaExamUrl}/code/${examCode}/`;
    return this.http.get<Exam>(url);
  }
  getAllExamData(): Observable<Exam[]> {
    const url = `${this.javaExamUrl}/`;
    return this.http.get<Exam[]>(url);
  }


  
  getStaticExamById():Observable<Exam>{
    return this.http.get<Exam>('/assets/static_data/ExamData.json')
  }
  getExamById(examCode: string):Observable<Exam>{
    return this.http.get<Exam>(`${this.javaExamUrl}/code/${examCode}`)
  }


  getStaticQuestionPaper(): Observable<Paper> {
    return this.http.get<Paper>('/assets/static_data/paper.json');
  }
  saveOption(optionAttempt: OptionAttempt): Observable<any> {
    return this.http.post(`${this.examUrl}exam/save-options/`, optionAttempt);
  }

  checkExamCodeWithDetail(examCode: string): Observable<HttpResponse<any>> {
    let data = {
      is_checking: true,
    };
    return this.http.post<HttpResponse<any>>(
      `${this.examUrl}exam/take-exam/${examCode}/`,
      data
    );
  }
  submitExam(examAttemptId: number, examCode :string):Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`${this.examUrl}exam/submit-exam/${examCode}/${examAttemptId}/`,{})
  }
  getResult(examAttemptId: string, examCode :string):Observable<ViewResult>{
    return this.http.get<ViewResult>(`${this.examUrl}exam/view-result/${examCode}/${examAttemptId}/`)
  }

 checkStaticExamByCode(examCode: string){

  
 }

 getStaticExamStatsByExamCode(examCode: string): Observable<ExamStatsModel>{
  return this.http.get<ExamStatsModel>('/assets/static_data/ExamStatsData.json')
  

 }
 getExamStatsByExamCode(examCode: string): Observable<ExamStatsModel>{
  return this.http.get<ExamStatsModel>(``)
  
 }

 getStaticUserResults(examCode: string):Observable<UsersResult[]>{
  return this.http.get<UsersResult[]>('/assets/static_data/UsersResult.json')

 }
 

}
