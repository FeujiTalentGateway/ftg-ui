import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogforuser',
  templateUrl: './confirm-dialogforuser.component.html',
  styleUrls: ['./confirm-dialogforuser.component.css'],
})
export class ConfirmDialogforuserComponent {
  @Output() confirmBox = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogforuserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; note: string }
  ) {}

  confirm(): void {
    this.confirmBox.emit(true);
    this.dialogRef.close();
  }

  cancel(): void {
    this.confirmBox.emit(false);
    this.dialogRef.close();
  }
}
