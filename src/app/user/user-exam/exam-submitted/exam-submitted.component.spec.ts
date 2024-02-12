import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSubmittedComponent } from './exam-submitted.component';

describe('ExamSubmittedComponent', () => {
  let component: ExamSubmittedComponent;
  let fixture: ComponentFixture<ExamSubmittedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamSubmittedComponent]
    });
    fixture = TestBed.createComponent(ExamSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
