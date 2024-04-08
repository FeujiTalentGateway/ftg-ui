import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject as RxSubject } from 'rxjs';
import { Question } from '../models/question';
import { Subject } from '../models/subject';
import { SnackBarService } from './snack-bar.service';
import { SubjectRepositoryService } from '../repository/subject-repository.service';
import { QuestionRepository } from '../repository/question-repository.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questions: Question[] = [];
  subjets: Subject[] = [];
  dialogRef: any;
  private questionChanged = new RxSubject<void>();
  private formSubmitSucceed = new RxSubject<void>();

  // Observable to notify subscribers when quesitons are changed
  questionChanged$ = this.questionChanged.asObservable();
  formSubmitSucceed$ = this.formSubmitSucceed.asObservable();
  constructor(
    private route: Router,
    private questionRepository: QuestionRepository,
    private snackBarService: SnackBarService,
    private subjectRepository: SubjectRepositoryService
  ) {
    // this.getRestFullCall();
  }
  questionObservable = new Observable<any>((observable) => {
    observable.next(this.questions);
  });
  getRestFullCall() {
    this.questionRepository.getAllQuestions().subscribe({
      next: (response) => {
        this.questions = response;
      },
    });
  }
  getAllQuestions() {
    return this.questions;
  }
  addQuestion(question: any) {
    this.questionRepository.addQuestion(question).subscribe({
      next: (response: any) => {
        this.formSubmitSucceed.next();
        this.snackBarService.openSnackBar(
          'Question added successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message, 'Close');
      },
    });
  }
  getQuestionById(id: number): Observable<Question> {
    return this.questionRepository.getQuestionBYId(id);
  }
  editQuestion(question: any) {
    this.questionRepository.editQuestion(question).subscribe({
      next: (response) => {
        this.formSubmitSucceed.next();
        this.route.navigate(['/admin/questionPapers/viewQuestions'], {
          queryParams: { subject: question.subject.id },
        });

        this.snackBarService.openSnackBar('Quesiton updated successfully');
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message);
      },
    });
  }
  deleteQuestion(id: number) {
    this.questionRepository.deleteQuestion(id).subscribe({
      next: (response: any) => {
        this.questionChanged.next();
        this.snackBarService.openSnackBar(
          'Question deleted successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message, 'Close');
      },
    });
  }
}
