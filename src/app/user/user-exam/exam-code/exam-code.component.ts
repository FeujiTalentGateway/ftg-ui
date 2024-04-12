
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-exam-code',
  templateUrl: './exam-code.component.html',
  styleUrls: ['./exam-code.component.css'],
})
export class ExamCodeComponent implements OnInit {
  localExamArray: Exam[] = [];
  currentExam: Exam | undefined;

  ngOnInit(): void {
  }

  constructor(
    private examRepo: ExamService,
    private router: Router,
    private auth: AuthService
  ) {}
  examCode: string = '';
  isInputFocused: boolean = false;

  submitForm() {
    this.currentExam = this.localExamArray.find(
      (exam) => exam.examCode == this.examCode
    );
  
    if (!this.currentExam) {
      this.examRepo.checkExamAvailableForUserOrNot(this.examCode).subscribe(
        (response) => {
          this.router.navigate(['/user/exam/exam-instructions', this.examCode]);
        },
        (error) => {
          if (error.status === 0) {
            alert("Service not Available");
          } else if (error.status >= 700) {
            this.auth.openSnackBar(error.error.message || 'Unknown error', 'close');
          }
        }
      );
    } else {
      // Handle when exam is found locally
      this.router.navigate(['/user/exam/exam-instructions', this.examCode]);
    }
  }
  
}