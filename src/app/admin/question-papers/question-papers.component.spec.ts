import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPapersComponent } from './question-papers.component';

describe('QuestionPapersComponent', () => {
  let component: QuestionPapersComponent;
  let fixture: ComponentFixture<QuestionPapersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionPapersComponent]
    });
    fixture = TestBed.createComponent(QuestionPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
