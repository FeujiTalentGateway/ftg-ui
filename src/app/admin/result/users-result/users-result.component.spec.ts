import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersResultComponent } from './users-result.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

describe('UsersResultComponent', () => {
  let component: UsersResultComponent;
  let fixture: ComponentFixture<UsersResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersResultComponent],
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,
        RouterTestingModule,MatDialogModule,MatFormFieldModule, BrowserAnimationsModule,MatPaginatorModule,MatTableModule,MatInputModule]
    });
    fixture = TestBed.createComponent(UsersResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
