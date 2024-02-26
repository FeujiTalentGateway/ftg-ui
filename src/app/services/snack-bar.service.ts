import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
      panelClass: ['red-snackbar'], // Apply custom CSS classes
      verticalPosition: 'top',
      horizontalPosition: 'end', // Change to 'end' for top-right corner
    });
  }
  showSnackbar(message: string) {
    const config: MatSnackBarConfig = {
        duration: 3000, // 3 seconds
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['red-snackbar'] // Add a custom CSS class for red color
    };

    this.snackBar.open(message, 'Close', config);
}
}
