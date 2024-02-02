import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error400Component } from './error400.component';

describe('Error400Component', () => {
  let component: Error400Component;
  let fixture: ComponentFixture<Error400Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Error400Component]
    });
    fixture = TestBed.createComponent(Error400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
