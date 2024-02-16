import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedUserResultComponent } from './detailed-user-result.component';

describe('DetailedUserResultComponent', () => {
  let component: DetailedUserResultComponent;
  let fixture: ComponentFixture<DetailedUserResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedUserResultComponent]
    });
    fixture = TestBed.createComponent(DetailedUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
