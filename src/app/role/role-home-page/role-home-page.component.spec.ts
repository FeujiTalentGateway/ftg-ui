import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHomePageComponent } from './role-home-page.component';

describe('RoleHomePageComponent', () => {
  let component: RoleHomePageComponent;
  let fixture: ComponentFixture<RoleHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleHomePageComponent]
    });
    fixture = TestBed.createComponent(RoleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
