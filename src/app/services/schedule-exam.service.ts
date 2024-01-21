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

  

  constructor(private scheduleExamRepo:ScheduleExamRepositoryService,
    private snackBar:MatSnackBar,
    private route:Router) { }



  scheduleExam(formData: any) {
    this.scheduleExamRepo.scheduleExam(formData).subscribe(
      {
        next :(response:any) =>{
          if ((response.message).includes('Exam scheduled successfully')) {
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

  changeStatus(id: any, active: any) {
    this.scheduleExamRepo.changeStatus(id,active).subscribe(
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
