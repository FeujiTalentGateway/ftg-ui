// src/app/services/coding-question.service.ts

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CodingQuestion } from '../models/coding-question.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodingQuestionService {

  private dataUrl = 'assets/static_data/AllCodingQuestion.json';
  private baseUrl: string = environment.adminUrl;

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<CodingQuestion[]> {
    return this.http.get<CodingQuestion[]>(`${this.baseUrl}codingquestion?fullData=true`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
