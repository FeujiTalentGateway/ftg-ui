import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { of } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let forgotPasswordService: ForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent, HeaderComponent, FooterComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [ForgotPasswordService]
    });

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    forgotPasswordService = TestBed.inject(ForgotPasswordService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.emailForm).toBeDefined();
    expect(component.emailForm.get('email')).toBeDefined();
  });

  it('should validate email input as required', () => {
    const emailControl = component.getControl('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('should validate email input as maxLength', () => {
    const emailControl = component.getControl('email');
    emailControl?.setValue('a'.repeat(33) + '@example.com');
    expect(emailControl?.hasError('maxlength')).toBeTruthy();
  });

  it('should validate email input as pattern', () => {
    const emailControl = component.getControl('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('pattern')).toBeTruthy();
  });
  
});
