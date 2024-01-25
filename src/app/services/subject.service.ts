import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from '../models/subject';
import { SnackBarService } from './snack-bar.service';
import { SubjectRepositoryService } from '../repository/subject-repository.service';
import { Observable, Subject as RxSubject } from 'rxjs';
import { AddEditSubjectComponent } from '../admin/exams/add-edit-subject/add-edit-subject.component';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  dialogRef: any;
  subjects: Subject[] = [];
  constructor(
    private subjectRepositoryService: SubjectRepositoryService,
    private matDialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    this.getSubscribedSubjects();
  }
  private subjectChanged = new RxSubject<void>();

  // Observable to notify subscribers when subjects are changed
  subjectChanged$ = this.subjectChanged.asObservable();

  getSubscribedSubjects() {
    this.subjectRepositoryService.getAllSubjects().subscribe({
      next: (response: Subject[]) => {
        this.subjects = response;
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message);
      },
    });
  }
  getSubjects() {
    return this.subjects;
  }

  getUnSubscribedSubjectsByActiveStatus(
    isActive: boolean
  ): Observable<Subject[]> {
    return this.subjectRepositoryService.getAllSubjectsByActiveStatus(isActive);
  }

  deleteSubject(id: number) {
    this.subjectRepositoryService.deleteSubject(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.subjectChanged.next();
        this.snackBarService.openSnackBar('Subject deactivated successfully');
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message, 'Close');
      },
    });
  }

  //subject curd operations

  addSubject(subject: Subject) {
    this.subjectRepositoryService.addSubject(subject).subscribe({
      next: (response: any) => {
        console.log(response);
        this.subjectChanged.next();
        this.dialogRef.close();
        this.snackBarService.openSnackBar(
          'Subject added successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message, 'Close');
      },
    });
  }

  editSubject(subject: Subject) {
    this.subjectRepositoryService.editSubject(subject).subscribe({
      next: (response) => {
        console.log(response);
        this.subjectChanged.next();
        this.dialogRef.close();
        this.snackBarService.openSnackBar(
          'Subject updated successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message);
      },
    });
  }

  activateSubject(subjectId: number) {
    this.subjectRepositoryService.activateSubject(subjectId).subscribe({
      next: (response) => {
        console.log(response);
        this.subjectChanged.next();
        this.snackBarService.openSnackBar(
          'Subject activated successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message);
      },
    });
  }

  openEditSubjectModel(id: number) {
    let dialogConfig: MatDialogConfig = {
      width: '40%',
      height: '30%',
      disableClose: true,
      // other MatDialogConfig properties can go here
    };
    dialogConfig.data = {
      id: id,
    };
    this.dialogRef = this.matDialog.open(AddEditSubjectComponent, dialogConfig);
  }
}
