import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPassowrdComponent } from './reset-passowrd.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { of } from 'rxjs';

describe('ResetPassowrdComponent', () => {
  let component: ResetPassowrdComponent;
  let fixture: ComponentFixture<ResetPassowrdComponent>;
  let forgotPasswordService: ForgotPasswordService;

  beforeEach(() => {
   

    TestBed.configureTestingModule({
      declarations: [ResetPassowrdComponent, HeaderComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        NgxUiLoaderModule
      ],
      providers: [
      ]
    });
    fixture = TestBed.createComponent(ResetPassowrdComponent);
    component = fixture.componentInstance;
    forgotPasswordService = TestBed.inject(ForgotPasswordService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form group with password and confirmPassword controls', () => {
    expect(component.forgotPasswordRequestForm.contains('password')).toBeTruthy();
    expect(component.forgotPasswordRequestForm.contains('confirmPassword')).toBeTruthy();
  });

  it('should make password and confirmPassword controls required', () => {
    const passwordControl = component.getControl('password');
    const confirmPasswordControl = component.getControl('confirmPassword');

    passwordControl?.setValue('');
    confirmPasswordControl?.setValue('');

    expect(passwordControl?.valid).toBeFalsy();
    expect(confirmPasswordControl?.valid).toBeFalsy();
  });

  it('should toggle password visibility', () => {
    expect(component.passwordVisible).toBeFalsy();
    component.passwordVisibility();
    expect(component.passwordVisible).toBeTruthy();
    component.passwordVisibility();
    expect(component.passwordVisible).toBeFalsy();
  });

  it('should toggle confirm password visibility', () => {
    expect(component.confirmPasswordVisible).toBeFalsy();
    component.confirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeTruthy();
    component.confirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeFalsy();
  });


  it('should display error message if password is not provided', () => {
    const passwordControl = component.getControl('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-danger').textContent).toContain('Password is required.');
  });

  it('should display error message if confirm password is not provided', () => {
    const confirmPasswordControl = component.getControl('confirmPassword');
    confirmPasswordControl?.setValue('');
    confirmPasswordControl?.markAsTouched();

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-danger').textContent).toContain('Confirm Password is required.');
  });

  it('should enable submit button when form is valid', () => {
    component.getControl('password')?.setValue('password123');
    component.getControl('confirmPassword')?.setValue('password123');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="submit"]').disabled).toBeFalsy();
  });

  it('should disable submit button when form is invalid', () => {
    component.getControl('password')?.setValue('');
    component.getControl('confirmPassword')?.setValue('');
    
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="submit"]').disabled).toBeTruthy();
  });
});
