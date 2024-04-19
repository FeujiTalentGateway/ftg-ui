import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSubmittedComponent } from './exam-submitted.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExamSubmittedComponent', () => {
  let component: ExamSubmittedComponent;
  let fixture: ComponentFixture<ExamSubmittedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
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
