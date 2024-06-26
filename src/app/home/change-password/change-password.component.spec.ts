/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

class MockChangePasswordService {
  changePassword(pass: any) {
    return of({ success: true });
  }
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let changePasswordService: ChangePasswordService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent,HeaderComponent],
      imports: [ReactiveFormsModule, FormsModule,RouterModule
        , RouterTestingModule.withRoutes([])
      ],
      providers: [{ provide: ChangePasswordService, useClass: MockChangePasswordService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    changePasswordService = TestBed.inject(ChangePasswordService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty controls', () => {
    expect(component.changePasswordRequestForm).toBeDefined();
    expect(component.getControl('oldPassword')?.value).toBe('');
    expect(component.getControl('password')?.value).toBe('');
    expect(component.getControl('confirmPassword')?.value).toBe('');
  });

  it('should toggle visibility of password fields', () => {
    component.toggleVisibility('oldPassword');
    expect(component.oldPasswordVisible).toBeTrue();

    component.toggleVisibility('password');
    expect(component.passwordVisible).toBeTrue();

    component.toggleVisibility('confirmPassword');
    expect(component.confirmPasswordVisible).toBeTrue();
  });

  it('should validate form controls', () => {
    let oldPasswordControl = component.getControl('oldPassword');
    let passwordControl = component.getControl('password');
    let confirmPasswordControl = component.getControl('confirmPassword');

    oldPasswordControl?.setValue('');
    expect(oldPasswordControl?.valid).toBeFalse();
    
    oldPasswordControl?.setValue('123');
    expect(oldPasswordControl?.valid).toBeFalse();
    
    oldPasswordControl?.setValue('validpassword');
    expect(oldPasswordControl?.valid).toBeTrue();

    passwordControl?.setValue('newpassword');
    confirmPasswordControl?.setValue('newpassword');
    expect(passwordControl?.valid).toBeTrue();
    expect(confirmPasswordControl?.valid).toBeTrue();

    confirmPasswordControl?.setValue('differentpassword');
    expect(component.changePasswordRequestForm.errors).toEqual({ passwordMismatch: true });
  });

  it('should call changePasswordService on valid form submission', () => {
    spyOn(changePasswordService, 'changePassword').and.callThrough();

    component.changePasswordRequestForm.setValue({
      oldPassword: 'oldpassword123',
      password: 'newpassword123',
      confirmPassword: 'newpassword123'
    });

    component.onSubmit();

    expect(changePasswordService.changePassword).toHaveBeenCalledWith({
      oldPassword: btoa('oldpassword123'),
      newPassword: btoa('newpassword123')
    });
  });

  it('should not call changePasswordService on invalid form submission', () => {
    spyOn(changePasswordService, 'changePassword').and.callThrough();

    component.changePasswordRequestForm.setValue({
      oldPassword: '',
      password: 'short',
      confirmPassword: 'short'
    });

    component.onSubmit();

    expect(changePasswordService.changePassword).not.toHaveBeenCalled();
  });

  it('should handle changePasswordService success response', () => {
    spyOn(changePasswordService, 'changePassword').and.returnValue(of({ success: true }));

    component.changePasswordRequestForm.setValue({
      oldPassword: 'oldpassword123',
      password: 'newpassword123',
      confirmPassword: 'newpassword123'
    });

    component.onSubmit();

    expect(changePasswordService.changePassword).toHaveBeenCalled();
    // You can add additional expectations here to check for success handling
  });

  it('should handle changePasswordService error response', () => {
    spyOn(changePasswordService, 'changePassword').and.returnValue(throwError('Error'));

    component.changePasswordRequestForm.setValue({
      oldPassword: 'oldpassword123',
      password: 'newpassword123',
      confirmPassword: 'newpassword123'
    });

    component.onSubmit();

    expect(changePasswordService.changePassword).toHaveBeenCalled();
    // You can add additional expectations here to check for error handling
  });
});
