import { Injectable } from '@angular/core';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor( private authRepo: AuthRepositoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private matDialog: MatDialog,) { }

    private snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };

    changePassword(data: any): Observable<any> {
      return this.authRepo.changePassword(data).pipe(
        map((response) => {
          console.log(response)
          // Handle success
          this.snackBar.open('Password changed successfully!', 'Close', this.snackBarConfig);
          this.matDialog.closeAll(); 
          this.router.navigate(['main/login']); 
          return response;
        }),
        catchError((error) => {
          //Handle Error
          let errorMessage = error.error.message;
          this.snackBar.open(errorMessage, 'Close', this.snackBarConfig);
          return throwError(error); 
        })
      );
    }
}
