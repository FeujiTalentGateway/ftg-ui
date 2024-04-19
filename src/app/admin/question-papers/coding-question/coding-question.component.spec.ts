import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingQuestionComponent } from './coding-question.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatStepperModule } from '@angular/material/stepper';

describe('CodingQuestionComponent', () => {
  let component: CodingQuestionComponent;
  let fixture: ComponentFixture<CodingQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodingQuestionComponent],
      imports:[RouterTestingModule,MatStepperModule]
    });
    fixture = TestBed.createComponent(CodingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
