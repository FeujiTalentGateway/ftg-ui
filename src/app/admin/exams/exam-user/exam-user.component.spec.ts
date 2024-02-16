import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUserComponent } from './exam-user.component';

describe('ExamUserComponent', () => {
  let component: ExamUserComponent;
  let fixture: ComponentFixture<ExamUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamUserComponent]
    });
    fixture = TestBed.createComponent(ExamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
