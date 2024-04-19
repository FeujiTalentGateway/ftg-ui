import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultComponent } from './view-result.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewResult } from 'src/app/models/view-result';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/repository/exam.service';
import { of, throwError } from 'rxjs';
import { ResultTimeQuestion } from 'src/app/models/question';


describe('ViewResultComponent', () => {
  let component: ViewResultComponent;
  let fixture: ComponentFixture<ViewResultComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockExamService: any;
  let mockViewResult: ViewResult;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      paramMap: of({
        get: (param: string) => {
          if (param === 'examCode') return 'exampleExamCode';
          if (param === 'examAttemptId') return 'exampleAttemptId';
          return null;
        }
      })
    };
    mockExamService = jasmine.createSpyObj('ExamService', ['getResult']);
    await TestBed.configureTestingModule({
      declarations: [ ViewResultComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ExamService, useValue: mockExamService }
      ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({

      declarations: [ViewResultComponent],
      imports:[HttpClientTestingModule,MatSnackBarModule,FormsModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule]

      
    });
    fixture = TestBed.createComponent(ViewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call examService.getResult with correct parameters on init', () => {
    expect(mockExamService.getResult).toHaveBeenCalledWith('exampleAttemptId', 'exampleExamCode');
  });

  it('should set result$ to the result obtained from examService', () => {
    expect(component.result$).toBeUndefined;
  });

  it('should set result when result$ emits a value', () => {
    mockExamService.getResult.and.returnValue(of(mockViewResult));
    component.ngOnInit();
    expect(component.result).toEqual(mockViewResult);
  });
  it('should return "Correct Option" if the selected option matches the correct option', () => {
    const question: ResultTimeQuestion = { correct_option_id: 1, selected_option_id: 1 ,id:1,content:'',options:[]};
    const message = component.getTheMassage(question);
    expect(message).toBe('Correct Option');
  });

  it('should return "Wrong Option" if an option is selected but does not match the correct option', () => {
    const question: ResultTimeQuestion = { correct_option_id: 1, selected_option_id: 2 ,id:1,content:'',options:[]};

    const message = component.getTheMassage(question);
    expect(message).toBe('Wrong Option');
  });

  it('should return "Not Attempted" if no option is selected', () => {
    const question: ResultTimeQuestion = { correct_option_id: 1, selected_option_id: undefined ,id:1,content:'',options:[]};

    const message = component.getTheMassage(question);
    expect(message).toBe('Not Attempted');
  });
  
});
