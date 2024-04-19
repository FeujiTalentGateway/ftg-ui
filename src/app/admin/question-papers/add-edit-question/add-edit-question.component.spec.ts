import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionComponent } from './add-edit-question.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

describe('AddEditQuestionComponent', () => {
  let component: AddEditQuestionComponent;
  let fixture: ComponentFixture<AddEditQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule,MatTooltipModule,MatIconModule],
      declarations: [ AddEditQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
