import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamRepositoryService } from '../repository/schedule-exam-repository.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleExamService {
  examFormDetails!: Exam;
  private examsSubject = new BehaviorSubject<Exam[]>([]);
  exams$ = this.examsSubject.asObservable();

  private goBackSubject = new BehaviorSubject<boolean>(false);
  goBack$ = this.goBackSubject.asObservable();

  constructor(
    private scheduleExamRepo: ScheduleExamRepositoryService,
    private route: Router,
    private snackBar: SnackBarService
  ) {
    this.fetchExams();
  }

  updateExam(formData: Exam) {
    this.scheduleExamRepo.updateExam(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status == 200) {
          this.goBackSubject.next(true);
          const updatedExams = this.examsSubject.value.map((exam) => {
            // Replace the existing exam with the updated one if they have the same id
            return exam.id === response.body.id ? response.body : exam;
          });
          // Reverse the order of the array
          const reversedExams = updatedExams;
          this.examsSubject.next(reversedExams);
          this.snackBar.openSnackBarSuccessMessage(
            'Exam updated successfully',
            'Close'
          );
          this.route.navigate(['/admin/exams/viewExams']);
        }
      },
      (error: any) => {
        this.snackBar.openSnackBarForError(error.error.message, 'Close');
      }
    );
  }

  scheduleExam(formData: any) {
    this.scheduleExamRepo.scheduleExam(formData).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status == 201) {
          this.goBackSubject.next(true);
          this.snackBar.openSnackBarSuccessMessage(
            'Exam scheduled successfully',
            'Close'
          );
          this.route.navigate(['/admin/exams/viewExams']);
          // Use unshift to add the new response to the beginning of the array
          this.examsSubject.next([...this.examsSubject.value, response.body]);
        }
      },
      (error: any) => {
        if (error) {
          this.snackBar.openSnackBarForError(error.error.message, 'Close');
        }
      }
    );
  }

  getExams(): Observable<HttpResponse<any>> {
    return this.scheduleExamRepo.getStaticExams();
  }

  // Optionally, you can have another method to handle the subscription in the component
  fetchExams(): void {
    this.scheduleExamRepo.getExams().subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          // Assuming that response.body is an array of exams
          this.examsSubject.next(response.body);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      },
      (error: any) => {
        console.error('Error fetching exams:', error);
      }
    );
  }

  changeExamStatus(id: any) {
    this.scheduleExamRepo.changeExamStatus(id).subscribe({
      next: (response: any) => {
        this.snackBar.openSnackBarSuccessMessage(response.message, 'Close');
        if (response.status == 200) {
          this.snackBar.openSnackBarForError('Exam status updated!!', 'Close');

          // Find the index of the existing object with the same ID
          const index = this.examsSubject.value.findIndex(
            (exam) => exam.id === response.body.id
          );

          if (index !== -1) {
            // Replace the existing object with the updated object
            const updatedExams = [...this.examsSubject.value];
            updatedExams[index] = response.body;
            this.examsSubject.next(updatedExams);
          }
        }
      },
      error: (error: any) => {
        this.snackBar.openSnackBarForError(error.error.message, 'Close');
      },
    });
  }

  setExamDetails(details: any) {
    this.examFormDetails = { ...details };
  }

  getExamDetails() {
    return { ...this.examFormDetails };
  }
}
