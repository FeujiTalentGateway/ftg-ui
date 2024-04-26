// test-result-popup.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test-result-popup',
  templateUrl: './test-result-popup.component.html',
  styleUrls: ['./test-result-popup.component.css']
})
export class TestResultPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<TestResultPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
