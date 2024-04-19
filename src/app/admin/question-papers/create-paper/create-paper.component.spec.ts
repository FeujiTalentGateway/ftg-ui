import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaperComponent } from './create-paper.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreatePaperComponent', () => {
  let component: CreatePaperComponent;
  let fixture: ComponentFixture<CreatePaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [CreatePaperComponent]
    });
    fixture = TestBed.createComponent(CreatePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
