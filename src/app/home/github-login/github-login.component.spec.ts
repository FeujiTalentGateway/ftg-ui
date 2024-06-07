import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubLoginComponent } from './github-login.component';

describe('GithubLoginComponent', () => {
  let component: GithubLoginComponent;
  let fixture: ComponentFixture<GithubLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubLoginComponent]
    });
    fixture = TestBed.createComponent(GithubLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
