import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ContactComponent } from './contact.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['']);
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ ContactComponent,HeaderComponent,FooterComponent],
            imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: MatSnackBar, useValue: snackBarSpyObj }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onLogin method when form is submitted with valid data', () => {
    spyOn(component, 'onLogin').and.callThrough();

    // Set form data
    component.userForm?.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });

    // Trigger form submission
    component.onLogin();

    expect(component.onLogin).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      "Thank you for reaching out to us. We've received your message and are looking into it.",
      'Close',
      { duration: 5000 }
    );
    expect(component.userForm?.get('name')?.value).toBeNull();
    expect(component.userForm?.get('email')?.value).toBeNull();
    expect(component.userForm?.get('message')?.value).toBeNull();
  });

  it('should not call onLogin method when form is submitted with invalid data', () => {
    spyOn(component, 'onLogin').and.callThrough();

    component.onLogin();

    expect(component.onLogin).toHaveBeenCalled();
    expect(snackBarSpy.open).not.toHaveBeenCalled();
  });
});
