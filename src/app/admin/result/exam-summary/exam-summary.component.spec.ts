import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSummaryComponent } from './exam-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExamSummaryComponent', () => {
  let component: ExamSummaryComponent;
  let fixture: ComponentFixture<ExamSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamSummaryComponent],
      imports:[HttpClientTestingModule,RouterTestingModule]
    });
    fixture = TestBed.createComponent(ExamSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
