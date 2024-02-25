import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageboxComponent } from './massagebox.component';

describe('MassageboxComponent', () => {
  let component: MassageboxComponent;
  let fixture: ComponentFixture<MassageboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassageboxComponent]
    });
    fixture = TestBed.createComponent(MassageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
