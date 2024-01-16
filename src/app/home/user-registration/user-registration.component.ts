import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

// Custom validator function for username format
function usernameFormatValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const username = control.value;
  if (!/^[a-zA-Z]{4}[a-zA-Z0-9\s\S]*$/.test(username)) {
    return { invalidUsername: true };
  }
  return null;
}

export function passwordMatch(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField)?.value;
    const confirmPassword = control.get(confirmPasswordField)?.value;

    // Check if both password and confirmPassword fields have values
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  @ViewChild('form') form!: NgForm;

  constructor(private authService: AuthService) {}
  name: string = '';
  confirmPassword: string = '';
  formSubmitted: boolean = false;
  newuser: User = new User();
  createUser() {
    console.log('creating the user');

    // console.log(this.newuser);
    // console.log(this.name);
    // console.log(this.newuser.first_name_s);
    // this.formSubmitted = true

    // this.restdata.createUser(this.newuser).subscribe(
    //   (response) =>{
    //     console.log("response")
    //   },
    //   (error) => {
    //     console.log("error in back end ");

    //   }
    // )
    const userData: User = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      userName: this.registerForm.get('userName')?.value,
      emailId: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };
    console.log(userData);
    this.authService.register(userData);

    // this.restdata.createUser(userData).subscribe(
    //   (response) => {
    //     console.log("User created successfully:", response);

    //     this.registerForm.reset();
    //     this.formSubmitted = false;
    //   },
    //   (error) => {
    //     console.log("Error in backend:", error);

    //   }
    // );
  }
  // validation part

  registeredEmail!: string;
  // Flags for password visibility
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  //Email Verification Form
  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
      Validators.pattern(this.emailRegex),
    ]),
  });

  // Form group for registration
  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s']{1,32}$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s-']{1,32}$/),
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        usernameFormatValidator,
      ]),
      email: new FormControl(this.registeredEmail, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern(this.emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(32),
        Validators.minLength(8),
      ]),
    },
    [passwordMatch('password', 'confirmPassword')]
  );

  // Function to get a form control by its property name
  getControl(property: any): AbstractControl | null {
    return this.registerForm.get(property);
  }
  getEmailFormControl(property: any): AbstractControl | null {
    return this.emailForm.get(property);
  }

  // Function to toggle password visibility
  passwordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Function to toggle confirm password visibility
  confirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  // Function to handle user registration
  register(data: FormGroup) {
    console.log('Inside register component: register()');
    this.createUser();
  }

  // sendOtp(data: FormGroup) {
  //   this.isOtpSentDisabled = true;
  //   console.log(data.value.email);
  //   this.authService.sendOtpToVerifyEmail(data.value.email);
  //   setTimeout(() => {
  //     this.isOtpSentDisabled = !this.isOtpSentDisabled;
  //   }, 5000);
}
