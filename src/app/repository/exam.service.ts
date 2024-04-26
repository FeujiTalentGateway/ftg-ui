import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailedUserResult } from '../models/detailedUserResult.model';
import { Exam } from '../models/exam.model';
import { ExamStatsModel } from '../models/exam.stats.model';
import { OptionAttempt } from '../models/option.attempt';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
import { UsersResult } from '../models/users.result.model';
import { ViewResult } from '../models/view-result';
import { CodingQuestions } from '../models/codingquestions.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {



  examUrl: string = ' http://127.0.0.1:8000/';
  javaExamUrl: string = environment.adminUrl + 'exam';
  resultUrl: string = environment.adminUrl;
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

  getStaticData(): Observable<any[]> {
    return this.http.get<any[]>('/assets/static_data/listOfExams.json');
  }

  getStaticExamData(): Observable<any[]> {
    return this.http.get<any[]>('/assets/static_data/listOfExams.json');
  }
  getAllExamData(): Observable<Exam[]> {
    const url = `${this.javaExamUrl}/`;
    return this.http.get<Exam[]>(url);
  }

  getStaticExamById(): Observable<Exam> {
    return this.http.get<Exam>('/assets/static_data/ExamData.json');
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
  submitExam(attemptID: number): Observable<HttpResponse<any>> {
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

  getListOFAttemptedQuestions(examAttemptId : number, subjectId:number):any{
    return this.http.get(`${this.javaExamUrl}/attempted-questions/subject/${examAttemptId}/${subjectId}`)
  }

  checkStaticExamByCode(examCode: string) {}

  getStaticListOfExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>('/assets/static_data/ListOfExamsDynamic.json');
  }

  getStaticExamByCode(examCode: string): Observable<Exam> {
    return this.http.get<Exam>('/assets/static_data/ExamDataObject.json');
  }

 getStaticExamStatsByExamCode(examCode: string): Observable<ExamStatsModel>{
  return this.http.get<ExamStatsModel>('/assets/static_data/ExamStatsData.json')


 }
 getExamStatsByExamCode(examCode: string): Observable<ExamStatsModel>{
  return this.http.get<ExamStatsModel>(`${this.resultUrl}result/${examCode}`)

 }

 getStaticDetailedUserResult(examCode: string,userId : number):Observable<DetailedUserResult>{
  return this.http.get<DetailedUserResult>('/assets/static_data/DetailedUserResult.json')

 }
 getDetailedUserResult(examCode: string,userId : number):Observable<DetailedUserResult>{
  return this.http.get<DetailedUserResult>(`${this.resultUrl}result/${examCode}/${userId}`)

 }

  getStaticUserResults(examCode: string): Observable<UsersResult[]> {
    return this.http.get<UsersResult[]>('/assets/static_data/UsersResult.json');
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

  getStaticQuestionByExamCodeAndSubjectId(
    examCode: string,
    subjectId: number
  ): Observable<Question> {
    return this.http.get<Question>('/assets/static_data/QuestionData.json');
  }
  getQuestionByExamCodeAndSubjectId(
    examCode: string,
    subjectId: number
  ): Observable<Question> {
    return this.http.get<Question>('');
  }
  submitStaticQuestion(question: Question | undefined): Observable<Question> {
    return this.http.get<Question>('/assets/static_data/QuestionData.json');
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
    console.log(data, '=====================================================');

    return this.http.get<any>('/assets/static_data/startExamObject.json');
  }

  startExam(
    examCode: string,
    difficulty: number,
    subjectId: Number,
    codingSubjectId:Number | undefined
  ): Observable<any> {
    let data = {
      examCode: examCode,
      difficulty: difficulty,
      startDate: new Date().toISOString().slice(0, 23),
      subjectId: subjectId,
      codingSubjectId:codingSubjectId
    };
    console.log(data);

    return this.http.post<any>(`${this.javaExamUrl}/start/question`, data);
  }

  changeSubjectAndGetFirstQuestion(question: any): Observable<Question> {
    return this.http.post<Question>(
      `${this.javaExamUrl}/change-subject`,
      question
    );
  }
  getCodingQuestions(){
    return this.http.get<CodingQuestions[]>(`${this.resultUrl}codingquestion?fullData=false`);
    //return this.http.get<CodingQuestions[]>(`/assets/static_data/CodingQuestions.json`);
  }

  getExamCodingQuestions():Observable<any> {
    return this.http.get<any>('/assets/static_data/ExamCodingQuestion.json');
  }


  
  executeCode(codeValue: string): Observable<any> {
    console.log(codeValue);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.javaExamUrl}/coding-question/run`, codeValue, { headers: headers });
  }

  submitCode(requestPayload: any):Observable<any> {
    console.log(requestPayload);
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.javaExamUrl}/coding-question/submit`, requestPayload, { headers: headers });
  
  }

}

