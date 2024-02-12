import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamLayoutComponent } from './user-exam-layout.component';

describe('UserExamLayoutComponent', () => {
  let component: UserExamLayoutComponent;
  let fixture: ComponentFixture<UserExamLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserExamLayoutComponent]
    });
    fixture = TestBed.createComponent(UserExamLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
