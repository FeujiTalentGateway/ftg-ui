import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogforuser',
  templateUrl: './confirm-dialogforuser.component.html',
  styleUrls: ['./confirm-dialogforuser.component.css'],
})
export class ConfirmDialogforuserComponent {
  @Output() confirmBox = new EventEmitter<boolean>();
  constructor(public dialogRef: MatDialogRef<ConfirmDialogforuserComponent>) {}

  confirm(): void {
    this.confirmBox.emit(true);
    this.dialogRef.close();
  }

  cancel(): void {
    this.confirmBox.emit(false);
    this.dialogRef.close();
  }
}
