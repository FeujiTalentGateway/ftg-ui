import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator Function
export function validIdentifierValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const identifierPattern = /^[A-Za-z_][A-Za-z0-9_]*$/;

    if (value && !identifierPattern.test(value)) {
      return { invalidIdentifier: true }; // Validation fails
    }

    return null; // Validation passes
  };
}
