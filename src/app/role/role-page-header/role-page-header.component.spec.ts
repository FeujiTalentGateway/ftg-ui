import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePageHeaderComponent } from './role-page-header.component';

describe('RolePageHeaderComponent', () => {
  let component: RolePageHeaderComponent;
  let fixture: ComponentFixture<RolePageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolePageHeaderComponent]
    });
    fixture = TestBed.createComponent(RolePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
