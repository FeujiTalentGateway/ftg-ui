import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-exam-code',
  templateUrl: './exam-code.component.html',
  styleUrls: ['./exam-code.component.css'],
})
export class ExamCodeComponent implements OnInit {
  localExamArray: Exam[] = [];
  currentExam: Exam | undefined;

  ngOnInit(): void {}

  constructor(
    private examRepo: ExamService,
    private router: Router,
    private auth: AuthService,
    private snackbar: SnackBarService
  ) {}
  examCode: string = '';
  isInputFocused: boolean = false;

  submitForm() {
    this.currentExam = this.localExamArray.find(
      (exam) => exam.examCode == this.examCode
    );

    //   on production
    this.examRepo.checkExamAvailableForUserOrNot(this.examCode).subscribe(
      (response) => {
        this.router.navigate(['/user/exam/exam-instructions', this.examCode]);
      },
      (error) => {
        this.snackbar.openRedAlertSnackBar(error.error.error, 'close');
        if (error.status == 0) {
          alert('service not Available');
        } else if (error.status >= 700) {
          this.snackbar.openRedAlertSnackBar(error.error.message, 'close');
        }
      }
    );
  }
}
