import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CodingQuestionComponent } from './coding-question.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CodingQuestionComponent', () => {
  let component: CodingQuestionComponent;
  let fixture: ComponentFixture<CodingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodingQuestionComponent],
      imports: [
        RouterTestingModule,
        MatStepperModule,
        HttpClientTestingModule,
        ReactiveFormsModule, 
        BrowserAnimationsModule,
        MatSnackBarModule 
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
