import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamDetailComponent } from './view-exam-detail.component';

describe('ViewExamDetailComponent', () => {
  let component: ViewExamDetailComponent;
  let fixture: ComponentFixture<ViewExamDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExamDetailComponent]
    });
    fixture = TestBed.createComponent(ViewExamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
