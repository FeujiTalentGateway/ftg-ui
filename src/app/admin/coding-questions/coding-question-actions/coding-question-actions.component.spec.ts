import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingQuestionActionsComponent } from './coding-question-actions.component';

describe('CodingQuestionActionsComponent', () => {
  let component: CodingQuestionActionsComponent;
  let fixture: ComponentFixture<CodingQuestionActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodingQuestionActionsComponent]
    });
    fixture = TestBed.createComponent(CodingQuestionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
