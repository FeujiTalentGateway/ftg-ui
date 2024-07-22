import { ComponentFixture, TestBed } from '@angular/core/testing';
// src/app/components/view-questions/view-questions.component.spec.ts

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CodingQuestionService } from 'src/app/services/coding-question.service';
import { ViewQuestionsComponent } from './view-questions.component';
import { of, throwError } from 'rxjs';
import { CodingQuestion } from 'src/app/models/coding-question.model';
import { By } from '@angular/platform-browser';

const mockQuestions: CodingQuestion[] = [
  {
    id: 1,
    content: 'Sum of All Values',
    description: 'Write a function that takes a Map<String, Integer> as an argument and returns the sum of all values in the map.',
    difficultLevel: 0,
    constraints: [{ id: 8, constraint: 'Nothing' }],
    testCases: [
      {
        id: 1,
        expectedResult: '10',
        explanationExample: 'Since the sum of values 1, 2, 3, and 4 is 10, the result will be 10.',
        isSample: true,
        inputArguments: [
          {
            id: 1,
            inputValue: '{"a": 1, "b": 2, "c": 3, "d": 4}',
            methodArgument: {
              id: 1,
              argumentName: 'inputMap',
              argumentPosition: 1,
              isCollection: true,
              primitiveDataType: {
                id: 5,
                commonDataType: 'String',
                pythonDataType: 'str',
                javaDataType: 'String',
                isCollection: false
              },
              collectionDataType: {
                id: 8,
                commonDataType: 'Map',
                pythonDataType: 'map',
                javaDataType: 'Map',
                isCollection: true
              }
            },
            methodArgumentName: 'inputMap'
          }
        ]
      }
    ],
    methodDefinition: {
      id: 1,
      methodName: 'sumOfValues',
      isCollectionType: false,
      primitiveReturnType: {
        id: 1,
        commonDataType: 'int',
        pythonDataType: 'int',
        javaDataType: 'int',
        isCollection: false
      },
      collectionReturnType: null,
      methodArguments: [
        {
          id: 1,
          argumentName: 'inputMap',
          argumentPosition: 1,
          isCollection: true,
          primitiveDataType: {
            id: 5,
            commonDataType: 'String',
            pythonDataType: 'str',
            javaDataType: 'String',
            isCollection: false
          },
          collectionDataType: {
            id: 8,
            commonDataType: 'Map',
            pythonDataType: 'map',
            javaDataType: 'Map',
            isCollection: true
          }
        }
      ]
    }
  }
];

describe('ViewQuestionsComponent', () => {
  let component: ViewQuestionsComponent;
  let fixture: ComponentFixture<ViewQuestionsComponent>;
  let codingQuestionService: CodingQuestionService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewQuestionsComponent],
      imports: [HttpClientTestingModule],
      providers: [CodingQuestionService]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewQuestionsComponent);
    component = fixture.componentInstance;
    codingQuestionService = TestBed.inject(CodingQuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


   it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should retrieve all questions on init', () => {
    spyOn(codingQuestionService, 'getAllQuestions').and.returnValue(of(mockQuestions));

    component.ngOnInit();

    expect(component.codingQuestionData).toEqual(mockQuestions);
    expect(component.isExpanded.length).toBe(mockQuestions.length);
  });

   it('should handle error while retrieving questions', () => {
    spyOn(codingQuestionService, 'getAllQuestions').and.returnValue(throwError('Error occurred'));

    component.ngOnInit();

    expect(component.codingQuestionData).toEqual([]);
    expect(component.isExpanded.length).toBe(0);
  });

   it('should toggle the isExpanded property', () => {
    component.isExpanded = [false, false];
    component.toggle(1);

    expect(component.isExpanded[1]).toBeTrue();

    component.toggle(1);

    expect(component.isExpanded[1]).toBeFalse();
  });

});
