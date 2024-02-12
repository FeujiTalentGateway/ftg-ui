import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(
  password: string,
  confirm_password: string
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const passwordValue = form.get(password)?.value;
    const confirmPasswordValue = form.get(confirm_password)?.value;
    // Check if confirm password is not empty before comparing
    if (confirmPasswordValue !== '' && passwordValue !== confirmPasswordValue) {
      return { passwordMismatchError: true };
    }

    return null;
  };
}
