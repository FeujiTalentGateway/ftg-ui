import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject as RxSubject } from 'rxjs';
import { AddEditSubjectComponent } from '../admin/exams/add-edit-subject/add-edit-subject.component';
import { Subject } from '../models/subject';
import { SubjectRepositoryService } from '../repository/subject-repository.service';
import { SnackBarService } from './snack-bar.service';

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
        this.snackBarService.openRedAlertSnackBar(error.error.message);
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
        this.subjectChanged.next();
        this.snackBarService.openSnackBarSuccessMessage(
          'Subject deactivated successfully'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBarForError(error.error.message, 'Close');
      },
    });
  }

  //subject curd operations

  addSubject(subject: Subject) {
    this.subjectRepositoryService.addSubject(subject).subscribe({
      next: (response: any) => {
        this.subjectChanged.next();
        this.dialogRef.close();
        this.snackBarService.openSnackBarSuccessMessage(
          'Subject added successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBarForError(error.error.message, 'Close');
      },
    });
  }

  editSubject(subject: Subject) {
    this.subjectRepositoryService.editSubject(subject).subscribe({
      next: (response) => {
        this.subjectChanged.next();
        this.dialogRef.close();
        this.snackBarService.openSnackBarSuccessMessage(
          'Subject updated successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBarForError(error.error.message);
      },
    });
  }

  activateSubject(subjectId: number) {
    this.subjectRepositoryService.activateSubject(subjectId).subscribe({
      next: (response) => {
        this.subjectChanged.next();
        this.snackBarService.openSnackBarSuccessMessage(
          'Subject activated successfully',
          'Close'
        );
      },
      error: (error) => {
        this.snackBarService.openSnackBarForError(error.error.message);
      },
    });
  }

  openEditSubjectModel(id: number) {
    let dialogConfig: MatDialogConfig = {
      width: '50%',
      height: '50%',
      disableClose: true,
      // other MatDialogConfig properties can go here
    };
    dialogConfig.data = {
      id: id,
    };
    this.dialogRef = this.matDialog.open(AddEditSubjectComponent, dialogConfig);
  }
}
