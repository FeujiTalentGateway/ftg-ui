/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { UserLoginComponent } from './user-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { GithubLoginComponent } from '../github-login/github-login.component';
import { AuthService } from 'src/app/services/auth.service';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let authService: AuthService;
  let ngxLoader: NgxUiLoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoginComponent, HeaderComponent,GithubLoginComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([ // Configure routes here
          { path: 'login', component: UserLoginComponent },
        ]),
        RouterTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
        NgxUiLoaderModule
      ],
      providers: [
        NgxUiLoaderService,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    ngxLoader = TestBed.inject(NgxUiLoaderService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin method when form is submitted', fakeAsync(() => {
    spyOn(component, 'onLogin');
    component.userForm?.controls['userName'].setValue('testuser');
    component.userForm?.controls['password'].setValue('password123');
    fixture.detectChanges();
    tick(); 
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    if (form) {
      form.triggerEventHandler('ngSubmit', null);
      tick(); 
      fixture.detectChanges();
      expect(component.onLogin).toHaveBeenCalled();
    } else {
      console.error('Form not found');
      fail('Form should be found in the template');
    }
  }));

  it('should show username required error when touched and left empty', () => {
    const usernameInput = component.userForm?.controls['userName'];
    usernameInput?.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent).toContain('Username is required.');
  });

  it('should show password required error when touched and left empty', () => {
    const passwordInput = component.userForm?.controls['password'];
    passwordInput?.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent).toContain('Password is required.');
  });

 
  it('should call onLogin method when form is submitted', async(() => {
    spyOn(component, 'onLogin');
    component.userForm?.controls['userName'].setValue('testuser');
    component.userForm?.controls['password'].setValue('password123');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    
    fixture.whenStable().then(() => {
      expect(component.onLogin).toHaveBeenCalled();
    });
  }));

  it('should toggle password visibility when eye icon is clicked', () => {
    const eyeIcon = fixture.debugElement.query(By.css('#eye')).nativeElement;
    expect(component.isPasswordVisible).toBeFalsy();
    
    eyeIcon.click();
    fixture.detectChanges();
    
    expect(component.isPasswordVisible).toBeTruthy();
    
    eyeIcon.click();
    fixture.detectChanges();
    
    expect(component.isPasswordVisible).toBeFalsy();
  });

  it('should toggle password visibility', () => {
    const initialVisibility = component.isPasswordVisible;
    component.ToggleEye();
    expect(component.isPasswordVisible).toBe(!initialVisibility);
  });

  it('should start loader and call authService login on form submission if valid', fakeAsync(() => {
    spyOn(ngxLoader, 'start');
    spyOn(ngxLoader, 'stop');
    component.userForm?.controls['userName'].setValue('testuser');
    component.userForm?.controls['password'].setValue('password123');
    component.onLogin();
    expect(ngxLoader.start).toHaveBeenCalled();
    tick(2000); // Simulate the 2000ms timeout
    expect(ngxLoader.stop).toHaveBeenCalled();
  }));
  
});
