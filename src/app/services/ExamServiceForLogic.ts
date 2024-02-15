import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../repository/exam.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExamServiceForLogic {
  
  
  constructor(private examRepo: ExamService,
    private route: Router,
    private auth: AuthService) { }

  checkExamPresentOrNot(examCode: string) {
    this.examRepo.checkExamByCode(examCode).subscribe(
      (response) => {
        return response
      },
      (error) => {
        this.auth.openSnackBar("Re enter your Exam Code",'close')
        console.log(error);
        if (error.status == 400){
          this.route.navigateByUrl('/user/exam/exam-code')
        }
        
      }
    );
  }
  

}
