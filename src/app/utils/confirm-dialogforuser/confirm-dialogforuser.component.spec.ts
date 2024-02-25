import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogforuserComponent } from './confirm-dialogforuser.component';

describe('ConfirmDialogforuserComponent', () => {
  let component: ConfirmDialogforuserComponent;
  let fixture: ComponentFixture<ConfirmDialogforuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogforuserComponent]
    });
    fixture = TestBed.createComponent(ConfirmDialogforuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
