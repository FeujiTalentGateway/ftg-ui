import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ExamService } from '../repository/exam.service';
import { AuthService } from './auth.service';
import { SnackBarService } from './snack-bar.service';
import { of, throwError } from 'rxjs';
import { ExamServiceForLogic } from './exam-service-for-logic.service';

describe('ExamServiceForLogic', () => {
  let service: ExamServiceForLogic;
  let mockExamService: jasmine.SpyObj<ExamService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSnackBarService: jasmine.SpyObj<SnackBarService>;

  beforeEach(() => {
    const examServiceSpy = jasmine.createSpyObj('ExamService', ['checkExamAvailableForUserOrNot']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], ['isLoggedIn']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', ['openSnackBarForError']);

    TestBed.configureTestingModule({
      providers: [
        ExamServiceForLogic,
        { provide: ExamService, useValue: examServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
      ],
    });

    service = TestBed.inject(ExamServiceForLogic);
    mockExamService = TestBed.inject(ExamService) as jasmine.SpyObj<ExamService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockSnackBarService = TestBed.inject(SnackBarService) as jasmine.SpyObj<SnackBarService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle successful exam availability check', () => {
    const examCode = 'ABCDE';
    const mockResponse = { /* Mock your expected response object */ };
    mockExamService.checkExamAvailableForUserOrNot.and.returnValue(of(mockResponse));

    service.checkExamAvailableForUserOrNot(examCode);

    expect(mockExamService.checkExamAvailableForUserOrNot).toHaveBeenCalledWith(examCode);
  });

  it('should handle 400 error and navigate to exam code entry', () => {
    const examCode = 'ABCDE';
    const mockErrorResponse = { status: 400 };

    mockExamService.checkExamAvailableForUserOrNot.and.returnValue(throwError(mockErrorResponse));

    service.checkExamAvailableForUserOrNot(examCode);

    expect(mockExamService.checkExamAvailableForUserOrNot).toHaveBeenCalledWith(examCode);
    expect(mockSnackBarService.openSnackBarForError).toHaveBeenCalledWith('Re-enter your Exam Code', 'Close');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/exam/exam-code');
  });

});
