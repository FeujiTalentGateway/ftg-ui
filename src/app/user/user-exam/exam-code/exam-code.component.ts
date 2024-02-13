import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { NgForm } from '@angular/forms';
import { GlobalExceptionHandlerService } from 'src/app/Exception_handler_service/global-exception-handler.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private auth: AuthService
  ) {}
  examCode: string = '';
  isInputFocused: boolean = false;
  // is_chekining

  submitForm() {
    this.currentExam = this.localExamArray.find(
      (exam) => exam.examCode == this.examCode
    );
    console.log(this.currentExam);
    if (this.currentExam) {
      console.log(this.examCode);
      this.router.navigate([
        '/user/exam/exam-instructions',
        this.examCode,
      ]);
    const exampleCode = this.examCode;
    this.router.navigate(['/user/exam/exam-instructions', exampleCode]);
    }

    //   on production
    this.examRepo.checkExamCodeWithDetail(this.examCode).subscribe(
      (response) => {
        console.log(response);
        this.examCode;
        this.router.navigate(['/user/exam/exam-instructions', this.examCode]);
      },
      (error) => {
        console.log(error);
        console.log(error.error.error);
        this.auth.openSnackBar(error.error.error, 'close');
        if (error.status == 0){
          alert("service not Available")
        }
      }
    );
  }
}
