import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailedUserResultComponent } from './detailed-user-result.component';

describe('DetailedUserResultComponent', () => {
  let component: DetailedUserResultComponent;
  let fixture: ComponentFixture<DetailedUserResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      declarations: [DetailedUserResultComponent],
    });
    fixture = TestBed.createComponent(DetailedUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
