import { TestBed } from '@angular/core/testing';
import { ChangePasswordService } from './change-password.service';
import { AuthRepositoryService } from '../repository/auth-repository.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('ChangePasswordService', () => {
  let service: ChangePasswordService;
  let mockAuthRepo: jasmine.SpyObj<AuthRepositoryService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const authRepoSpy = jasmine.createSpyObj('AuthRepositoryService', ['changePassword']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);

    TestBed.configureTestingModule({
      providers: [
        ChangePasswordService,
        { provide: AuthRepositoryService, useValue: authRepoSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    });

    service = TestBed.inject(ChangePasswordService);
    mockAuthRepo = TestBed.inject(AuthRepositoryService) as jasmine.SpyObj<AuthRepositoryService>;
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockMatDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change password successfully', () => {
    const testData = {password:'testPassword123'};
    const mockResponse = { status: 500, error: { message: 'Success' } };
    mockAuthRepo.changePassword.and.returnValue(of(mockResponse));

    service.changePassword(testData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Password changed successfully!',
        'Close',
        service['snackBarConfig']
      );
      expect(mockMatDialog.closeAll).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['main/login']);
    });

    expect(mockAuthRepo.changePassword).toHaveBeenCalledWith(testData);
  });

  it('should handle 500 server error', () => {
    const testData = {password:'testPassword123'};
    const mockErrorResponse = { status: 500, error: { message: 'Server error' } };
    mockAuthRepo.changePassword.and.returnValue(throwError(mockErrorResponse));

    service.changePassword(testData).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(mockErrorResponse);
        expect(mockSnackBar.open).toHaveBeenCalledWith(
          'An internal server error occurred. Please try again later.',
          'Close',
          service['snackBarConfig']
        );
        expect(mockMatDialog.closeAll).not.toHaveBeenCalled(); 
        expect(mockRouter.navigate).not.toHaveBeenCalled();
      }
    );
    expect(mockAuthRepo.changePassword).toHaveBeenCalledWith(testData);
  });

});
