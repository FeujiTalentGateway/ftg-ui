import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MassageboxComponent } from './massagebox.component';

describe('MassageboxComponent', () => {
  let component: MassageboxComponent;
  let fixture: ComponentFixture<MassageboxComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MassageboxComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [MassageboxComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true and close dialog on confirm', () => {
    const emitSpy = spyOn(component.confirmBox, 'emit');

    component.confirm();
    
    expect(emitSpy).toHaveBeenCalledWith(true);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should emit false and close dialog on cancel', () => {
    const emitSpy = spyOn(component.confirmBox, 'emit');

    component.cancel();
    
    expect(emitSpy).toHaveBeenCalledWith(false);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
