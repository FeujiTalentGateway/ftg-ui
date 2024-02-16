import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageCircleComponent } from './percentage-circle.component';

describe('PercentageCircleComponent', () => {
  let component: PercentageCircleComponent;
  let fixture: ComponentFixture<PercentageCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PercentageCircleComponent]
    });
    fixture = TestBed.createComponent(PercentageCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
