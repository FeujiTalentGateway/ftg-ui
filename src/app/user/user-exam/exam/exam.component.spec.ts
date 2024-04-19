import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamComponent } from './exam.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ExamComponent', () => {
  let component: ExamComponent;
  let fixture: ComponentFixture<ExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamComponent],
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule]

    });
    fixture = TestBed.createComponent(ExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
