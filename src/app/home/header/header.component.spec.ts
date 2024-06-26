/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'main/register', component: HeaderComponent },
          { path: 'main/home', component: HeaderComponent },
          { path: 'main/login', component: HeaderComponent },
          { path: 'main/contact', component: HeaderComponent },
          { path: 'main/about', component: HeaderComponent },
          { path: 'main/forgot-password', component: HeaderComponent },
          { path: 'main/reset-password', component: HeaderComponent },
        ]),
        MatDialogModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isSignupPage', async(() => {
    router.navigate(['/main/register']).then(() => {
      expect(component.isSignupPage()).toBeTrue();
    });
  }));

  it('should return true for isHomePage', async(() => {
    router.navigate(['/main/home']).then(() => {
      expect(component.isHomePage()).toBeTrue();
    });
  }));

  it('should return true for isLoginPage', async(() => {
    router.navigate(['/main/login']).then(() => {
      expect(component.isLoginPage()).toBeTrue();
    });
  }));

  it('should return true for isContactPage', async(() => {
    router.navigate(['/main/contact']).then(() => {
      expect(component.isContactPage()).toBeTrue();
    });
  }));

  it('should return true for isAboutPage', async(() => {
    router.navigate(['/main/about']).then(() => {
      expect(component.isAboutPage()).toBeTrue();
    });
  }));

  it('should return true for isForgotPasswordPage', async(() => {
    router.navigate(['/main/forgot-password']).then(() => {
      expect(component.isForgotPasswordPage()).toBeTrue();
    });
  }));

  it('should return true for isResetPasswordPage', async(() => {
    router.navigate(['/main/reset-password']).then(() => {
      expect(component.isResetPasswordPage()).toBeTrue();
    });
  }));
});
