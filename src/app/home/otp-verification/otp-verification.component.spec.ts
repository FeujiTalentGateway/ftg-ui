// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { OtpVerificationComponent } from './otp-verification.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { NgxUiLoaderService, NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
// import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { MatIconModule } from '@angular/material/icon';

// describe('OtpVerificationComponent', () => {
//   let component: OtpVerificationComponent;
//   let fixture: ComponentFixture<OtpVerificationComponent>;
//   let forgotPasswordService: jasmine.SpyObj<ForgotPasswordService>;
//   let ngxUiLoaderService: jasmine.SpyObj<NgxUiLoaderService>;
//   let mockDialogRef: jasmine.SpyObj<MatDialogRef<OtpVerificationComponent>>;

//   beforeEach(async () => {
//     forgotPasswordService = jasmine.createSpyObj('ForgotPasswordService', ['verifyOtp', 'sendOtpToEmail']);
//     ngxUiLoaderService = jasmine.createSpyObj('NgxUiLoaderService', ['start', 'stop', 'getDefaultConfig']);
//     mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

//     const defaultConfig: NgxUiLoaderConfig = {
//       bgsColor: '#00ACC1',
//       bgsOpacity: 0.5,
//       bgsPosition: 'bottom-right',
//       bgsSize: 60,
//       bgsType: 'ball-spin-clockwise',
//       blur: 5,
//       delay: 0,
//       fastFadeOut: true,
//       fgsColor: '#00ACC1',
//       fgsPosition: 'center-center',
//       fgsSize: 60,
//       fgsType: 'ball-spin-clockwise',
//       gap: 24,
//       logoPosition: 'center-center',
//       logoSize: 120,
//       logoUrl: '',
//       masterLoaderId: 'master',
//       overlayBorderRadius: '0',
//       overlayColor: 'rgba(40, 40, 40, 0.8)',
//       pbColor: '#00ACC1',
//       pbDirection: 'ltr',
//       pbThickness: 3,
//       hasProgressBar: true,
//       text: '',
//       textColor: '#FFFFFF',
//       textPosition: 'center-center',
//       maxTime: -1,
//       minTime: 300
//     };

//     ngxUiLoaderService.getDefaultConfig.and.returnValue(defaultConfig);

//     await TestBed.configureTestingModule({
//       declarations: [OtpVerificationComponent],
//       imports: [ReactiveFormsModule, BrowserAnimationsModule,NgxUiLoaderModule,MatIconModule],
//       providers: [
//         FormBuilder,
//         { provide: ForgotPasswordService, useValue: forgotPasswordService },
//         { provide: NgxUiLoaderService, useValue: ngxUiLoaderService },
//         { provide: MatDialogRef, useValue: mockDialogRef },
//         { provide: MAT_DIALOG_DATA, useValue: { user: { emailId: 'test@example.com' } } }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OtpVerificationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize otpForm with six controls', () => {
//     expect(Object.keys(component.otpForm.controls)).toEqual(['digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6']);
//   });

//   it('should start the timer on init', () => {
//     component.ngOnInit();
//     expect(component.remainingTime).toBe(60);
//     expect(component.isResendDisabled).toBeTrue();
//   });

//   it('should move to the next input when a digit is entered', () => {
//     const digit1Input = fixture.debugElement.query(By.css('#digit1')).nativeElement;
//     digit1Input.value = '1';
//     digit1Input.dispatchEvent(new Event('input'));

//     spyOn(component, 'focusNextInput');
//     component.moveToNextInput({ target: digit1Input }, 0);
//     expect(component.focusNextInput).toHaveBeenCalledWith(0);
//   });

//   it('should enable resend button after 1 minute', (done) => {
//     component.startTimer();
//     setTimeout(() => {
//       expect(component.isResendDisabled).toBeFalse();
//       done();
//     }, 61000);
//   });

//   it('should format time correctly', () => {
//     expect(component.formatTime(65)).toBe('1:05');
//     expect(component.formatTime(30)).toBe('0:30');
//   });

//   it('should close the dialog on closeDialog call', () => {
//     component.closeDialog();
//     expect(mockDialogRef.close).toHaveBeenCalled();
//   });

//   it('should call sendOtpToEmail on resendOTP if resend button is enabled', () => {
//     component.isResendDisabled = false;
//     component.resendOTP();
//     expect(ngxUiLoaderService.start).toHaveBeenCalled();
//     expect(forgotPasswordService.sendOtpToEmail).toHaveBeenCalledWith('test@example.com');
//     expect(mockDialogRef.close).toHaveBeenCalled();
//   });

//   it('should not call sendOtpToEmail on resendOTP if resend button is disabled', () => {
//     component.isResendDisabled = true;
//     component.resendOTP();
//     expect(ngxUiLoaderService.start).not.toHaveBeenCalled();
//     expect(forgotPasswordService.sendOtpToEmail).not.toHaveBeenCalled();
//   });
// });