import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedUserResultComponent } from './detailed-user-result.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';


describe('DetailedUserResultComponent', () => {
  let component: DetailedUserResultComponent;
  let fixture: ComponentFixture<DetailedUserResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule],
      declarations: [DetailedUserResultComponent]
    });
    fixture = TestBed.createComponent(DetailedUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
