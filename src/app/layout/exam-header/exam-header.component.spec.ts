import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamHeaderComponent } from './exam-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ExamHeaderComponent', () => {
  let component: ExamHeaderComponent;
  let fixture: ComponentFixture<ExamHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,MatDialogModule],
      declarations: [ExamHeaderComponent]
    });
    fixture = TestBed.createComponent(ExamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});