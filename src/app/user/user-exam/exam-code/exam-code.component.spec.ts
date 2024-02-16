import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCodeComponent } from './exam-code.component';

describe('ExamCodeComponent', () => {
  let component: ExamCodeComponent;
  let fixture: ComponentFixture<ExamCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamCodeComponent]
    });
    fixture = TestBed.createComponent(ExamCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
