import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSnippetComponent } from './code-snipet.component';

describe('CodeSnipetComponent', () => {
  let component: CodeSnippetComponent;
  let fixture: ComponentFixture<CodeSnippetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeSnippetComponent]
    });
    fixture = TestBed.createComponent(CodeSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
