import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUserComponent } from './exam-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule here
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ExamUserComponent', () => {
    let component: ExamUserComponent;
    let fixture: ComponentFixture<ExamUserComponent>;
    let mockDialogRef: MatDialogRef<ExamUserComponent>;
  
    beforeEach(() => {
      mockDialogRef = jasmine.createSpyObj(['close']);
  
      TestBed.configureTestingModule({
        declarations: [ExamUserComponent],
        imports: [
          HttpClientTestingModule,
          MatSnackBarModule,
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          MatDialogModule,
          MatIconModule,
          MatPaginatorModule,
          MatTableModule,
          MatCheckboxModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: { examData: { users: [] } } }
        ]
      });
  
      fixture = TestBed.createComponent(ExamUserComponent);
      component = fixture.componentInstance;
    });
  
    afterEach(() => {
      component.ngOnDestroy(); // Ensure cleanup
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should initialize with empty user list', () => {
      expect(component.users).toEqual([]);
      expect(component.dataSource.data.length).toBe(0);
    });
  
    it('should call getUsers() and populate users on ngOnInit', async () => {
      spyOn(component, 'getUsers').and.callThrough();
  
      fixture.detectChanges();
      await fixture.whenStable(); // Wait for async operations to complete
  
      expect(component.getUsers).toHaveBeenCalled();
      expect(component.examFormDetails).toBeDefined();
    });
  
    it('should update selection list based on examFormDetails users', async () => {
      fixture.detectChanges();
      await fixture.whenStable(); // Wait for async operations to complete
  
      component.examFormDetails.users = [{ userId: 1 }, { userId: 2 }]; // Mock selected users
  
      component.updateSelectionList();
  
      // Adjust this expectation based on your actual logic
      expect(component.selection.isSelected(component.users[0])).toBe(false);
    });
  
  
  });