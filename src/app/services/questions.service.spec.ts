import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from '../repository/question-repository.service';
import { SnackBarService } from './snack-bar.service';
import { SubjectRepositoryService } from '../repository/subject-repository.service';
import { Question } from '../models/question';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let questionRepositorySpy: jasmine.SpyObj<QuestionRepository>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let subjectRepositorySpy: jasmine.SpyObj<SubjectRepositoryService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const questionRepositorySpyObj = jasmine.createSpyObj('QuestionRepository', ['getAllQuestions', 'addQuestion', 'getQuestionBYId', 'editQuestion', 'deleteQuestion']);
    const snackBarServiceSpyObj = jasmine.createSpyObj('SnackBarService', ['openSnackBarSuccessMessage', 'openSnackBarForError']);
    const subjectRepositorySpyObj = jasmine.createSpyObj('SubjectRepositoryService', ['getAllSubjects']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        QuestionsService,
        { provide: QuestionRepository, useValue: questionRepositorySpyObj },
        { provide: SnackBarService, useValue: snackBarServiceSpyObj },
        { provide: SubjectRepositoryService, useValue: subjectRepositorySpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    service = TestBed.inject(QuestionsService);
    questionRepositorySpy = TestBed.inject(QuestionRepository) as jasmine.SpyObj<QuestionRepository>;
    snackBarServiceSpy = TestBed.inject(SnackBarService) as jasmine.SpyObj<SnackBarService>;
    subjectRepositorySpy = TestBed.inject(SubjectRepositoryService) as jasmine.SpyObj<SubjectRepositoryService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all questions', () => {
    const mockQuestions: Question[] = [
      {
        id: 1, content: 'What is 2+2?', options: [{ id: 1, optionName: "4", active: false }], rightOptions: [{ id: 1, optionName: "4", active: false }],
        active: false,
        difficultyLevel: 0,
        questionType: '',
        subject: { id: 1, name: 'Math', active: true },
        isCodeSnippet: false,
        codeSnippet: ''
      },
      {
        id: 2, content: 'What is the capital of France?', options: [{ id: 1, optionName: "Paris", active: false }], rightOptions: [{ id: 1, optionName: "Paris", active: false }],
        active: false,
        difficultyLevel: 0,
        questionType: '',
        subject: { id: 2, name: 'Geography', active: true },
        isCodeSnippet: false,
        codeSnippet: ''
      }
    ];

    questionRepositorySpy.getAllQuestions.and.returnValue(of(mockQuestions));

    service.getRestFullCall();

    expect(service.questions).toEqual(mockQuestions);
    expect(questionRepositorySpy.getAllQuestions).toHaveBeenCalled();
  });

  it('should add a question successfully', () => {
    const newQuestion: Question = {
      id: 3,
      content: 'New Question',
      options: [],
      rightOptions: [],
      active: true,
      difficultyLevel: 1,
      questionType: 'MCQ',
      subject: { id: 1, name: 'Math', active: true },
      isCodeSnippet: false,
      codeSnippet: ''
    };

    questionRepositorySpy.addQuestion.and.returnValue(of(newQuestion));
    service.addQuestion(newQuestion);

    expect(questionRepositorySpy.addQuestion).toHaveBeenCalledWith(newQuestion);
    expect(snackBarServiceSpy.openSnackBarSuccessMessage).toHaveBeenCalledWith('Question added successfully', 'Close');
  });

  it('should handle error when adding a question', () => {
    const newQuestion: Question = {
      id: 3,
      content: 'New Question',
      options: [],
      rightOptions: [],
      active: true,
      difficultyLevel: 1,
      questionType: 'MCQ',
      subject: { id: 1, name: 'Math', active: true },
      isCodeSnippet: false,
      codeSnippet: ''
    };
    const errorMessage = 'Error adding question';

    questionRepositorySpy.addQuestion.and.returnValue(throwError({ error: { message: errorMessage } }));
    service.addQuestion(newQuestion);

    expect(questionRepositorySpy.addQuestion).toHaveBeenCalledWith(newQuestion);
    expect(snackBarServiceSpy.openSnackBarSuccessMessage).toHaveBeenCalledWith(errorMessage, 'Close');
  });

  it('should edit a question successfully', () => {
    const editedQuestion: Question = {
      id: 1,
      content: 'Edited Question',
      options: [],
      rightOptions: [],
      active: true,
      difficultyLevel: 1,
      questionType: 'MCQ',
      subject: { id: 1, name: 'Math', active: true },
      isCodeSnippet: false,
      codeSnippet: ''
    };

    questionRepositorySpy.editQuestion.and.returnValue(of(editedQuestion));
    service.editQuestion(editedQuestion);

    expect(questionRepositorySpy.editQuestion).toHaveBeenCalledWith(editedQuestion);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/questionPapers/viewQuestions'], { queryParams: { subject: editedQuestion.subject.id } });
    expect(snackBarServiceSpy.openSnackBarSuccessMessage).toHaveBeenCalledWith('Question updated successfully');
  });

  it('should handle error when editing a question', () => {
    const editedQuestion: Question = {
      id: 1,
      content: 'Edited Question',
      options: [],
      rightOptions: [],
      active: true,
      difficultyLevel: 1,
      questionType: 'MCQ',
      subject: { id: 1, name: 'Math', active: true },
      isCodeSnippet: false,
      codeSnippet: ''
    };
    const errorMessage = 'Error editing question';

    questionRepositorySpy.editQuestion.and.returnValue(throwError({ error: { message: errorMessage } }));
    service.editQuestion(editedQuestion);

    expect(questionRepositorySpy.editQuestion).toHaveBeenCalledWith(editedQuestion);
    expect(snackBarServiceSpy.openSnackBarForError).toHaveBeenCalledWith(errorMessage);
  });

  it('should delete a question successfully', () => {
    const questionId = 1;

    questionRepositorySpy.deleteQuestion.and.returnValue(of({}));
    service.deleteQuestion(questionId);

    expect(questionRepositorySpy.deleteQuestion).toHaveBeenCalledWith(questionId);
    expect(snackBarServiceSpy.openSnackBarSuccessMessage).toHaveBeenCalledWith('Question deleted successfully', 'Close');
  });

  it('should handle error when deleting a question', () => {
    const questionId = 1;
    const errorMessage = 'Error deleting question';

    questionRepositorySpy.deleteQuestion.and.returnValue(throwError({ error: { message: errorMessage } }));
    service.deleteQuestion(questionId);

    expect(questionRepositorySpy.deleteQuestion).toHaveBeenCalledWith(questionId);
    expect(snackBarServiceSpy.openSnackBarForError).toHaveBeenCalledWith(errorMessage, 'Close');
  });
});
