import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassowrdComponent } from './reset-passowrd.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';


describe('ResetPassowrdComponent', () => {
  let component: ResetPassowrdComponent;
  let fixture: ComponentFixture<ResetPassowrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPassowrdComponent,HeaderComponent],
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule]

    });
    fixture = TestBed.createComponent(ResetPassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});