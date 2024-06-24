import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubLoginComponent } from './github-login.component';
import { GithubService } from 'src/app/services/github.service';
import { environment } from 'src/environments/environment';

const GITHUB_CLIENT_ID = 'Ov23liZTS3icPuM58Luz';  
const GITHUB_SCOPE = 'user';  

class MockGithubService {
  signInWithGitHub() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${environment.uiUrl}main/login&scope=${GITHUB_SCOPE}`;
  }
}

describe('GithubLoginComponent', () => {
  let component: GithubLoginComponent;
  let fixture: ComponentFixture<GithubLoginComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubLoginComponent],
      providers: [
        { provide: GithubService, useClass: MockGithubService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubLoginComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signInWithGitHub and change window.location.href when loginWithGitHub is called', () => {
    const locationHrefSpy = spyOnProperty(window, 'location', 'set');

    component.loginWithGitHub();

    expect(locationHrefSpy).toHaveBeenCalled();
    expect(locationHrefSpy.calls.mostRecent().args[0]).toBe(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${environment.uiUrl}main/login&scope=${GITHUB_SCOPE}`
    );
  });
});
