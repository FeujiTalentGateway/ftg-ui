import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubjectQuestionCount } from '../models/subject-question-count.model';
import { ExamUserStats } from '../models/ExamUserStats.model';

@Injectable({
  providedIn: 'root'
})
export class ChartDataRepositoryService {

  baseurl = environment.adminUrl;

  constructor(private http:HttpClient) {
    this.baseurl= this.baseurl+`chart-data`;
   }

  questionCountBySubject():Observable<SubjectQuestionCount[]>{
    return this.http.get<SubjectQuestionCount[]>(this.baseurl+'/question-count-by-subject');
  }

  getExamUserStats():Observable<ExamUserStats[]> {
   return this.http.get<ExamUserStats[]>(this.baseurl+'/exams-user-stats');
  }
}
