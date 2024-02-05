import { Injectable } from '@angular/core';
import { Exam } from 'src/app/models/exam.model'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { ScheduleExamRepositoryService } from '../repository/schedule-exam-repository.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExamService {

  private examsSubject = new BehaviorSubject<Exam[]>([]);
  exams$ = this.examsSubject.asObservable();
  
  constructor(private scheduleExamRepo:ScheduleExamRepositoryService,
    private snackBar:MatSnackBar,
    private route:Router) {
          // Initialize data when the service is created
    this.getExams().subscribe(
      (response: HttpResponse<any>) => {
        this.examsSubject.next(response.body || []);
      },
      (error: any) => {
        console.error('Error fetching exams on initialization:', error);
      }
    );
     }
  
    updateExam(formData: Exam) {
      this.scheduleExamRepo.updateExam(formData).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == 200) {
            const updatedExams = this.examsSubject.value.map(exam => {
              // Replace the existing exam with the updated one if they have the same id
              return exam.id === response.body.id ? response.body : exam;
            });
    
            // Reverse the order of the array
            const reversedExams = updatedExams.reverse();
    
            this.examsSubject.next(reversedExams);
            this.openSnackBar('Exam updated successfully', 'Close');
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
          if (response.status == 201) {
            this.openSnackBar('Exam scheduled successfully', 'Close');
            this.examsSubject.next([...this.examsSubject.value, response.body]);
          }
        },
        (error: any) => {
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
        this.exams$ = response.body;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  changeExamStatus(id: any) {
    this.scheduleExamRepo.changeExamStatus(id).subscribe({
      next: (response: any) => {
        if (response.status == 201) {
          this.openSnackBar(response.message, 'Close');
          this.examsSubject.next([...this.examsSubject.value, response.body]);
        }
      },
      error: (error: any) => {
        this.openSnackBar(error.error.message, 'Close');
      }
    });
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