import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PaperService } from './paper.service';
import { PaperRepositoryService } from '../repository/paper-repository.service';
import { Subject } from '../models/subject';
import { Question } from '../models/question';
import { Paper } from '../models/paper';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaperService', () => {
  let service: PaperService;
  let paperRepoSpy: jasmine.SpyObj<PaperRepositoryService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PaperRepositoryService', ['getAllSubjects', 'getAllQuestions', 'savePaper', 'getAllPapers', 'updatePaper']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PaperService,
        { provide: PaperRepositoryService, useValue: spy }
      ]
    });

    service = TestBed.inject(PaperService);
    paperRepoSpy = TestBed.inject(PaperRepositoryService) as jasmine.SpyObj<PaperRepositoryService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected subjects (getAllSubjects)', (done: DoneFn) => {
    const expectedSubjects: Subject[] = [{
      id: 1, name: 'Math',
      active: false
    }];

    paperRepoSpy.getAllSubjects.and.returnValue(of(expectedSubjects));

    service.getAllSubjects().subscribe({
      next: subjects => {
        expect(subjects).toEqual(expectedSubjects);
        done();
      },
      error: done.fail
    });

    expect(paperRepoSpy.getAllSubjects.calls.count()).toBe(1, 'one call');
  });

  it('should return expected questions (getAllQuestions)', (done: DoneFn) => {
    const expectedQuestions: Question[] = [{
      id: 1, content: 'What is 2+2?',
      active: false,
      difficultyLevel: 0,
      questionType: '',
      subject: {id:1,name:"",active:true},
      rightOptions: [],
      options: [],
      isCodeSnippet: false,
      codeSnippet: ''
    }];

    paperRepoSpy.getAllQuestions.and.returnValue(of(expectedQuestions));

    service.getAllQuestions().subscribe({
      next: questions => {
        expect(questions).toEqual(expectedQuestions);
        done();
      },
      error: done.fail
    });

    expect(paperRepoSpy.getAllQuestions.calls.count()).toBe(1, 'one call');
  });

  it('should save paper (savePaper)', (done: DoneFn) => {
    const newPaper: Paper = {
      id: 1, name: 'Updated Paper',
      active: false,
      questions: []
    };

    paperRepoSpy.savePaper.and.returnValue(of(newPaper));

    service.savePaper(newPaper).subscribe({
      next: paper => {
        expect(paper).toEqual(newPaper);
        done();
      },
      error: done.fail
    });

    expect(paperRepoSpy.savePaper.calls.count()).toBe(1, 'one call');
  });

  it('should return expected papers (getAllPapers)', (done: DoneFn) => {
    const expectedPapers: Paper[] = [{
      id: 1, name: 'Paper 1',
      active: false,
      questions: []
    }];

    paperRepoSpy.getAllPapers.and.returnValue(of(expectedPapers));

    service.getAllPapers().subscribe({
      next: papers => {
        expect(papers).toEqual(expectedPapers);
        done();
      },
      error: done.fail
    });

    expect(paperRepoSpy.getAllPapers.calls.count()).toBe(1, 'one call');
  });

  it('should update paper (updatePaper)', (done: DoneFn) => {
    const updatedPaper: Paper = {
      id: 1, name: 'Updated Paper',
      active: false,
      questions: []
    };

    paperRepoSpy.updatePaper.and.returnValue(of(updatedPaper));

    service.updatePaper(updatedPaper).subscribe({
      next: paper => {
        expect(paper).toEqual(updatedPaper);
        done();
      },
      error: done.fail
    });

    expect(paperRepoSpy.updatePaper.calls.count()).toBe(1, 'one call');
  });
});
