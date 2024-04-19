import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionsComponent } from './view-questions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ViewQuestionsComponent', () => {
  let component: ViewQuestionsComponent;
  let fixture: ComponentFixture<ViewQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,RouterTestingModule,FormsModule],
      declarations: [ViewQuestionsComponent]
    });
    fixture = TestBed.createComponent(ViewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
