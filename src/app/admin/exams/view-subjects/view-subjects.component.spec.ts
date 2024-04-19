import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectsComponent } from './view-subjects.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ViewSubjectsComponent', () => {
  let component: ViewSubjectsComponent;
  let fixture: ComponentFixture<ViewSubjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule,MatPaginatorModule,MatTableModule, BrowserAnimationsModule],
      declarations: [ViewSubjectsComponent]
    });
    fixture = TestBed.createComponent(ViewSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
