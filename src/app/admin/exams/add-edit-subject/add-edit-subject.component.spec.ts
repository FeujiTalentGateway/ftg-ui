import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubjectComponent } from './add-edit-subject.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddEditSubjectComponent', () => {
  let component: AddEditSubjectComponent;
  let fixture: ComponentFixture<AddEditSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule,MatSnackBarModule,MatIconModule,FormsModule,ReactiveFormsModule],

      declarations: [AddEditSubjectComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provide a mock implementation for MAT_DIALOG_DATA
      ]
    });
    fixture = TestBed.createComponent(AddEditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
