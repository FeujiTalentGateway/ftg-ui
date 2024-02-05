import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamsComponent } from './view-exams.component';

describe('ViewExamsComponent', () => {
  let component: ViewExamsComponent;
  let fixture: ComponentFixture<ViewExamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExamsComponent]
    });
    fixture = TestBed.createComponent(ViewExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
