import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsPageComponent } from './exams-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';


describe('ExamsPageComponent', () => {
  let component: ExamsPageComponent;
  let fixture: ComponentFixture<ExamsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamsPageComponent],
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule]
    });
    fixture = TestBed.createComponent(ExamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    let date = component.getStatus(true)
    expect(date).toBe('ACTIVE');
    let date1 = component.getStatus(false)
    expect(date1).toBe('INACTIVE');
  });
});
