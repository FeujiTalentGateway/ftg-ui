import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInstructionsComponent } from './exam-instructions.component';

describe('ExamInstructionsComponent', () => {
  let component: ExamInstructionsComponent;
  let fixture: ComponentFixture<ExamInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamInstructionsComponent]
    });
    fixture = TestBed.createComponent(ExamInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
