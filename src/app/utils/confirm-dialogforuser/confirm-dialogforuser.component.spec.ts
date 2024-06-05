import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogforuserComponent } from './confirm-dialogforuser.component';

// describe('ConfirmDialogforuserComponent', () => {
//   let component: ConfirmDialogforuserComponent;
//   let fixture: ComponentFixture<ConfirmDialogforuserComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, MatDialogModule],
//       declarations: [ConfirmDialogforuserComponent],
//       providers: [
//         { provide: MatDialogRef, useValue: {} },
//         { provide: MAT_DIALOG_DATA, useValue: {} } // Provide a mock implementation
//       ]
//     });
//     fixture = TestBed.createComponent(ConfirmDialogforuserComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  
// });
describe('ConfirmDialogforuserComponent', () => {
  let component: ConfirmDialogforuserComponent;
  let fixture: ComponentFixture<ConfirmDialogforuserComponent>;

  let mockMatDialogRef: MatDialogRef<ConfirmDialogforuserComponent>;

  beforeEach(() => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule],
      declarations: [ConfirmDialogforuserComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} } ,// Provide a mock implementation,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Test Title', message: 'Test Message', note: 'Test Note' }
        }
      ]
    });
    fixture = TestBed.createComponent(ConfirmDialogforuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true on confirm', () => {
    spyOn(component.confirmBox, 'emit');
    component.confirm();
    expect(component.confirmBox.emit).toHaveBeenCalledWith(true);
  });

  it('should emit false on cancel', () => {
    spyOn(component.confirmBox, 'emit');
    component.cancel();
    expect(component.confirmBox.emit).toHaveBeenCalledWith(false);
  });

  it('should close the dialog on confirm', () => {
    spyOn(component.dialogRef, 'close');
    component.confirm();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    spyOn(component.dialogRef, 'close');
    component.cancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
