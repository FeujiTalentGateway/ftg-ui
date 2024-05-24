import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPapersComponent } from './view-papers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';


describe('ViewPapersComponent', () => {
  let component: ViewPapersComponent;
  let fixture: ComponentFixture<ViewPapersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule],
      declarations: [ViewPapersComponent]
    });
    fixture = TestBed.createComponent(ViewPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});