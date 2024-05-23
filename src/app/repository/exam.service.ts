import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodingQuestions } from '../models/codingquestions.model';
import { DetailedUserResult } from '../models/detailedUserResult.model';
import { Exam } from '../models/exam.model';
import { ExamStatsModel } from '../models/exam.stats.model';
import { OptionAttempt } from '../models/option.attempt';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
import { UsersResult } from '../models/users.result.model';
import { ViewResult } from '../models/view-result';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  examUrl: string = ' http://127.0.0.1:8000/';
  javaExamUrl: string = environment.adminUrl + 'exam';
  resultUrl: string = environment.adminUrl;
  examsubmitted:boolean=false;
  constructor(private http: HttpClient) {}

  getPaperByExamCode(examCode: string): Observable<Paper> {
    return this.http.post<Paper>(
      `${this.examUrl}exam/take-exam/${examCode}/`,
      {}
    );
  }

  checkExamByCode(examCode: string): Observable<any> {
    const url = `${this.javaExamUrl}/by-code`;
    const params = { examCode: examCode };
    return this.http.get(url, { params });
  }

  getAllExamData(): Observable<Exam[]> {
    const url = `${this.javaExamUrl}/list`;
    return this.http.get<Exam[]>(url);
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
  submitExam(attemptID: number): Observable<HttpResponse<any>> {
    this.examsubmitted=true
    let data = {
      attemptId: attemptID,
      endDate: new Date().toISOString().slice(0, 23),
    };
    return this.http.post<HttpResponse<any>>(
      `${this.javaExamUrl}/submit`,
      data
    );
  }
  getResult(examAttemptId: string, examCode: string): Observable<ViewResult> {
    return this.http.get<ViewResult>(
      `${this.examUrl}exam/view-result/${examCode}/${examAttemptId}/`
    );
  }

  getListOFAttemptedQuestions(examAttemptId: number, subjectId: number): any {
    return this.http.get(
      `${this.javaExamUrl}/attempted-questions/subject/${examAttemptId}/${subjectId}`
    );
  }

  getExamStatsByExamCode(examCode: string): Observable<ExamStatsModel> {
    return this.http.get<ExamStatsModel>(`${this.resultUrl}result/${examCode}`);
  }

  getDetailedUserResult(
    examCode: string,
    userId: number
  ): Observable<DetailedUserResult> {
    return this.http.get<DetailedUserResult>(
      `${this.resultUrl}result/${examCode}/${userId}`
    );
  }

  getUserResults(examCode: string): Observable<UsersResult[]> {
    return this.http.get<UsersResult[]>(
      `${this.resultUrl}result/${examCode}?viewResultTable=true`
    );
  }

  getExamByCode(examCode: string): Observable<Exam> {
    const url = `${this.javaExamUrl}/code/${examCode}`;
    return this.http.get<Exam>(url);
  }

  getQuestionByExamCodeAndSubjectId(
    examCode: string,
    subjectId: number
  ): Observable<Question> {
    return this.http.get<Question>('');
  }

  submitQuestion(question: any | undefined): Observable<Question> {
    return this.http.post<Question>(
      `${this.javaExamUrl}/next-question`,
      question
    );
  }

  checkExamAvailableForUserOrNot(examCode: string): Observable<any> {
    return this.http.post<any>(`${this.javaExamUrl}/validate/${examCode}`, {});
  }
  startStaticExam(
    examCode: string,
    difficulty: number,
    subjectId: Number
  ): Observable<any> {
    let data = {
      examCode: examCode,
      difficulty: difficulty,
      startDate: new Date().toISOString().slice(0, 23),
      subjectId: subjectId,
    };

    return this.http.get<any>('/assets/static_data/startExamObject.json');
  }

  startExam(
    examCode: string,
    difficulty: number,
    subjectId: Number,
    codingSubjectId: Number | undefined
  ): Observable<any> {
    let data = {
      examCode: examCode,
      difficulty: difficulty,
      startDate: new Date().toISOString().slice(0, 23),
      subjectId: subjectId,
      codingSubjectId: codingSubjectId,
    };

    return this.http.post<any>(`${this.javaExamUrl}/start/question`, data);
  }

  changeSubjectAndGetFirstQuestion(question: any): Observable<Question> {
    return this.http.post<Question>(
      `${this.javaExamUrl}/change-subject`,
      question
    );
  }
  getStaticUserExamResults(examCode: string, userId : number):Observable<Question[]>{
    return this.http.get<Question[]>('/assets/static_data/UserResult.json')
    }
    getUserExamResults(examCode: string, userId : number):Observable<Question[]>{
    return this.http.get<Question[]>(`${this.resultUrl}result/response/${examCode}/${userId}`)
    }
    getCodingQuestions() {
    return this.http.get<CodingQuestions[]>(
      `${this.resultUrl}codingquestion?fullData=false`
    );
  }

  getExamCodingQuestions(): Observable<any> {
    return this.http.get<any>(`${this.resultUrl}codingquestion?fullData=false`);
  }

  executeCode(codeValue: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.javaExamUrl}/coding-question/run`,
      codeValue,
      { headers: headers }
    );
  }

  submitCode(requestPayload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.javaExamUrl}/coding-question/submit`,
      requestPayload,
      { headers: headers }
    );
  }
}
