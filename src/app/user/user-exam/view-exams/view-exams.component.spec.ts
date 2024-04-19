import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamsComponent } from './view-exams.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('ViewExamsComponent', () => {
  let component: ViewExamsComponent;
  let fixture: ComponentFixture<ViewExamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,MatPaginatorModule],
      declarations: [ViewExamsComponent]
    });
    fixture = TestBed.createComponent(ViewExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
