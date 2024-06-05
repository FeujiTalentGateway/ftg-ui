import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultPopupComponent } from './test-result-popup.component';

describe('TestResultPopupComponent', () => {
  let component: TestResultPopupComponent;
  let fixture: ComponentFixture<TestResultPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestResultPopupComponent]
    });
    fixture = TestBed.createComponent(TestResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
