import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPapersComponent } from './view-papers.component';

describe('ViewPapersComponent', () => {
  let component: ViewPapersComponent;
  let fixture: ComponentFixture<ViewPapersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPapersComponent]
    });
    fixture = TestBed.createComponent(ViewPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
