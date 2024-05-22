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
          // Handle success
          this.snackBar.open('Password changed successfully!', 'Close', this.snackBarConfig);
          this.matDialog.closeAll(); 
          this.router.navigate(['/login']); 
          return response;
        }),
        catchError((error) => {
          //Handle Error
          let errorMessage = 'Failed to change password. Please try again.';
  
          if (error.status === 400) {
      
            errorMessage = 'Invalid request. Please check the data and try again.';
          } else if (error.status === 401) {
          
            errorMessage = 'You are not authorized to perform this action.';
          } else if (error.status === 403) {
           
            errorMessage = 'You do not have permission to change the password.';
          } else if (error.status === 404) {
          
            errorMessage = 'The requested resource was not found.';
          } else if (error.status === 500) {
           
            errorMessage = 'An internal server error occurred. Please try again later.';
          }
  
          this.snackBar.open(errorMessage, 'Close', this.snackBarConfig);
          return throwError(error); 
        })
      );
    }
}
