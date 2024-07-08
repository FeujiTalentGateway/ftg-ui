import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NoopAnimationsModule],
      providers: [SnackBarService],
    });

    service = TestBed.inject(SnackBarService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snack bar with a custom message and action', () => {
    const spy = spyOn(snackBar, 'open');
    service.openSnackBar('Test message', 'Test action');

    expect(spy).toHaveBeenCalledWith('Test message', 'Test action', {
      duration: 2000,
      panelClass: 'centered-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  });

  it('should open a red alert snack bar with a custom message', () => {
    const spy = spyOn(snackBar, 'open');
    service.openRedAlertSnackBar('Red alert message');

    expect(spy).toHaveBeenCalledWith('Red alert message', '', {
      duration: 2000,
      panelClass: ['red-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  });

  it('should show a snackbar with a custom message', () => {
    const spy = spyOn(snackBar, 'open');
    service.showSnackbar('Show snackbar message');

    expect(spy).toHaveBeenCalledWith('Show snackbar message', '', {
      duration: 3000,
      panelClass: ['red-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  });

  it('should open a success snack bar with a custom message and action', () => {
    const spy = spyOn(snackBar, 'open');
    service.openSnackBarSuccessMessage('Success message', 'Success action');

    expect(spy).toHaveBeenCalledWith('Success message', 'Success action', {
      duration: 2000,
      panelClass: ['custom-snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  });

  it('should open an error snack bar with a custom message and action', () => {
    const spy = spyOn(snackBar, 'open');
    service.openSnackBarForError('Error message', 'Error action');

    expect(spy).toHaveBeenCalledWith('Error message', 'Error action', {
      duration: 2000,
      panelClass: ['custom-snackbar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  });
});
