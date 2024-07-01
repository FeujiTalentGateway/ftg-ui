import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInstructionsComponent } from './exam-instructions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ExamInstructionsComponent', () => {
  let component: ExamInstructionsComponent;
  let fixture: ComponentFixture<ExamInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,MatSnackBarModule,MatDialogModule],
      declarations: [ExamInstructionsComponent],
    });
    fixture = TestBed.createComponent(ExamInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
