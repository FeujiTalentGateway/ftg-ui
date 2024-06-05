import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../repository/exam.service';
import { AuthService } from './auth.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ExamServiceForLogic {
  constructor(
    private examRepo: ExamService,
    private route: Router,
    private auth: AuthService,
    private snackBar: SnackBarService
  ) {}

  checkExamAvailableForUserOrNot(examCode: string) {
    this.examRepo.checkExamAvailableForUserOrNot(examCode).subscribe(
      (response) => {
        return response;
      },
      (error) => {
        this.snackBar.openSnackBarForError('Re enter your Exam Code', 'close');
        if (error.status == 400) {
          this.route.navigateByUrl('/user/exam/exam-code');
        }
      }
    );
  }
}
