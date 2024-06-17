/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { UserRegistrationComponent } from './user-registration.component';
import { HeaderComponent } from '../header/header.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GithubLoginComponent } from '../github-login/github-login.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        NgxUiLoaderModule
      ],
      declarations: [UserRegistrationComponent, HeaderComponent,GithubLoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });


  it('should enable the submit button when the form is valid', () => {
    component.registerForm.controls['firstName'].setValue('Test');
    component.registerForm.controls['lastName'].setValue('User');
    component.registerForm.controls['email'].setValue('testuser@example.com');
    component.registerForm.controls['userName'].setValue('testuser');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should call register method when form is valid and submitted', () => {
    spyOn(component, 'register');

    component.registerForm.controls['firstName'].setValue('Test');
    component.registerForm.controls['lastName'].setValue('User');
    component.registerForm.controls['email'].setValue('testuser@example.com');
    component.registerForm.controls['userName'].setValue('testuser');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.register).toHaveBeenCalledWith(component.registerForm);
  });

  it('should toggle password visibility', () => {
    const initialVisibility = component.passwordVisible;
    component.passwordVisibility();
    expect(component.passwordVisible).toBe(!initialVisibility);
  });

  it('should toggle confirm password visibility', () => {
    const initialVisibility = component.confirmPasswordVisible;
    component.confirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBe(!initialVisibility);
  });

 

  it('should not show error message if passwords match', () => {
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('#confirmPassword ~ .text-danger'));
    expect(errorMessage).toBeFalsy();
  });

  it('should have a github login component', () => {
    const githubLoginComponent = fixture.debugElement.query(By.css('app-github-login'));
    expect(githubLoginComponent).toBeTruthy();
  });
});
