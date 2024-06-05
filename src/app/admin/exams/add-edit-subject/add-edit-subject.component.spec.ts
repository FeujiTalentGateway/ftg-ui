import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AddEditSubjectComponent } from './add-edit-subject.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

describe('AddEditSubjectComponent', () => {
  let component: AddEditSubjectComponent;
  let fixture: ComponentFixture<AddEditSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditSubjectComponent],
      imports: [HttpClientTestingModule,MatDialogModule,MatSnackBarModule,MatIconModule,FormsModule,ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize subject form', () => {
    component.initialiseSubjectForm();
    expect(component.subjectForm.get('id')).not.toBeNull();
    expect(component.subjectForm.get('name')).not.toBeNull();
    expect(component.subjectForm.get('active')).not.toBeNull();
  });

  it('should set subject value into subject form', () => {
    const subject = { id: 1, name: 'Test Subject', active: true };
    component.setSubjectValueIntoSubjectForm(subject);
    expect(component.subjectForm.value).toEqual(subject);
  });

  it('should handle form submission for adding a subject', () => {
    component.subjectForm.patchValue({ id: 1, name: 'New Subject', active: true });
    component.onSubmit();
    // Add appropriate expectations here based on the behavior of your code
  });

  it('should handle form submission for editing a subject', () => {
    component.subjectId = 1;
    component.subjectForm.patchValue({ id: 1, name: 'Updated Subject', active: true });
    component.onSubmit();
    // Add appropriate expectations here based on the behavior of your code
  });

  it('should open and close edit modal', () => {
    component.openEditModal();
    expect(component.isEditModalOpen).toBeTrue();

    component.closeEditModal();
    expect(component.isEditModalOpen).toBeFalse();
  });
});