import { Injectable } from '@angular/core';
import { Exam } from 'src/app/models/exam.model'; 
import { Observable } from 'rxjs';
import { ScheduleExamRepositoryService } from '../repository/schedule-exam-repository.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamService {
  
  updateExam(formData: Exam) {
    this.scheduleExamRepo.updateExam(formData).subscribe(
      {
        next :(response:any) =>{
  
            this.openSnackBar(response.message , 'Close');
            this.route.navigateByUrl('/admin/home');
  

        },
        error :(error:any) =>{

            this.openSnackBar(error.error.message, 'Close');          
        }
      }
    )
  }

  

  constructor(private scheduleExamRepo:ScheduleExamRepositoryService,
    private snackBar:MatSnackBar,
    private route:Router) { }



  scheduleExam(formData: any) {
    this.scheduleExamRepo.scheduleExam(formData).subscribe(
      {
        next: (response: any) => {
          // Check the HTTP status code
          const statusCode = response?.statusCode;
          console.log(statusCode);
          
  
          if (statusCode === 201) { 
            this.openSnackBar('Exam scheduled successfully', 'Close');
            this.route.navigateByUrl('/admin/home');
          }
        },
        error :(error:any) =>{

            this.openSnackBar(error.error.message, 'Close');          
        }
      }
    )
  }

  exams: Exam[] = [];

  
  
  getExam(): Observable<Exam[]> {
    return this.scheduleExamRepo.getExams();
  }

  getExams() : Exam[]{
    this.scheduleExamRepo.getExams().subscribe(
      {
        next :(response:any) =>{
          this.exams =response;
        },
        error :(error:any) =>{
          console.log(error);
          
        }
      }
      
    );
    
    return this.exams;

  }

  changeExamStatus(id: any) {
    this.scheduleExamRepo.changeExamStatus(id).subscribe(
      {
        next :(response:any) =>{
          
            this.openSnackBar(response.message, 'Close');


        },
        error :(error:any) =>{

            this.openSnackBar(error.error.message, 'Close');          
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'centered-snackbar', 
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
