import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestResultPopupComponent } from './test-result-popup.component';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

describe('TestResultPopupComponent', () => {
  let component: TestResultPopupComponent;
  let fixture: ComponentFixture<TestResultPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestResultPopupComponent],
      imports: [MatDialogModule, MatIconModule], // Include MatIconModule in imports
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
