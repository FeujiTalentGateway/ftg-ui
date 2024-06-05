import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-refresh-dialog',
  templateUrl: './refresh-dialog.component.html',
  styleUrls: ['./refresh-dialog.component.css'],
})
export class RefreshDialogComponent {
  @Output() refreshConfirmed = new EventEmitter<boolean>();

  constructor(public dialogRef: MatDialogRef<RefreshDialogComponent>) {}
  confirmRefresh(): void {
    this.refreshConfirmed.emit(true);
    this.dialogRef.close();
  }
}
