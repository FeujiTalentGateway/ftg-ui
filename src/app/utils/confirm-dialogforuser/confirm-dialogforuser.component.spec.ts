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

  // Emits a true value through the confirmBox EventEmitter.
  // it('should emit true value through confirmBox EventEmitter', () => {
  //   const emitSpy = spyOn(component.confirmBox, 'emit').and.callThrough();
  //   const closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();

  //   component.confirm();

  //   expect(emitSpy).toHaveBeenCalledWith(true);
  //   expect(closeSpy).toHaveBeenCalled();
  // });

  // // Emits a false value through the confirmBox EventEmitter
  // it('should emit false value through confirmBox EventEmitter when cancel is called', () => {
  //   const emitSpy = spyOn(component.confirmBox, 'emit').and.callThrough();
  //   const closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();

  //   component.cancel();

  //   expect(emitSpy).toHaveBeenCalledWith(false);
  //   expect(closeSpy).toHaveBeenCalled();
  // });
});
