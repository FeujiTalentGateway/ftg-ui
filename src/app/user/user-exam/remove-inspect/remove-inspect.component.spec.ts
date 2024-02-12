import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveInspectComponent } from './remove-inspect.component';

describe('RemoveInspectComponent', () => {
  let component: RemoveInspectComponent;
  let fixture: ComponentFixture<RemoveInspectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveInspectComponent]
    });
    fixture = TestBed.createComponent(RemoveInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
