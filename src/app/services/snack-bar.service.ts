import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'centered-snackbar', // Apply a custom CSS class
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  openRedAlertSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: 'centered-snackbar', // Apply a custom CSS class
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
