import { Injectable } from '@angular/core';
import { Exam } from 'src/app/models/exam.model'; 
import { Observable } from 'rxjs';
import { ScheduleExamRepositoryService } from '../repository/schedule-exam-repository.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamService {

  exams: Exam[] = [];
  
  constructor(private scheduleExamRepo:ScheduleExamRepositoryService,
    private snackBar:MatSnackBar,
    private route:Router) { }
  
    updateExam(formData: Exam) {
      this.scheduleExamRepo.updateExam(formData).subscribe(
        (response: HttpResponse<any>) => {
          if(response.status ==200){
          this.openSnackBar('Exam updated successfully', 'Close');
          this.exams.push(response.body);
          }
        },
        (error: any) => {
          this.openSnackBar(error.error.message, 'Close');
        }
      );      
    }



  scheduleExam(formData: any) {
    this.scheduleExamRepo.scheduleExam(formData).subscribe(
      (response: HttpResponse<any>) => {
        if(response.status == 201){
          this.openSnackBar('Exam scheduled successfully', 'Close');
          this.route.navigateByUrl('/admin/home');
          this.exams.push(response.body);
        }         
      },
      (error: any) => {
        // For error response
        if (error) {  
          this.openSnackBar(error.error.message, 'Close');
        }
      }
    );
  }
  

  getExams(): Observable<HttpResponse<any>> {
    return this.scheduleExamRepo.getExams();
  }

  // Optionally, you can have another method to handle the subscription in the component
  fetchExams(): void {
    this.getExams().subscribe(
      (response: HttpResponse<any>) => {
        this.exams = response.body;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  changeExamStatus(id: any) {
    this.scheduleExamRepo.changeExamStatus(id).subscribe(
      {
        next :(response:any) =>{

          if(response.status == 201){
            this.openSnackBar(response.message, 'Close');
            this.route.navigateByUrl('/admin/home');
            this.exams.push(response.body);
          } 
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