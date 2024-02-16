import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersResultComponent } from './users-result.component';

describe('UsersResultComponent', () => {
  let component: UsersResultComponent;
  let fixture: ComponentFixture<UsersResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersResultComponent]
    });
    fixture = TestBed.createComponent(UsersResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
