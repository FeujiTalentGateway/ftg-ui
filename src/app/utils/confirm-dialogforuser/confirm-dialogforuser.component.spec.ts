import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogforuserComponent } from './confirm-dialogforuser.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogforuserComponent', () => {
  let component: ConfirmDialogforuserComponent;
  let fixture: ComponentFixture<ConfirmDialogforuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule],
      declarations: [ConfirmDialogforuserComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} } // Provide a mock implementation
      ]
    });
    fixture = TestBed.createComponent(ConfirmDialogforuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
