import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamLayoutComponent } from './user-exam-layout.component';
import { ExamHeaderComponent } from '../../exam-header/exam-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';


describe('UserExamLayoutComponent', () => {
  let component: UserExamLayoutComponent;
  let fixture: ComponentFixture<UserExamLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserExamLayoutComponent,ExamHeaderComponent],
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule]
    });
    fixture = TestBed.createComponent(UserExamLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
