import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserdetailsService } from 'src/app/services/userdetails.service';
import { MainLayoutComponent } from './main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainHeaderComponent } from '../../main-header/main-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let userDetailsSpy: jasmine.SpyObj<UserdetailsService>;
  let matDrawerSpy: jasmine.SpyObj<MatDrawer>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const userDetailsServiceSpy = jasmine.createSpyObj('UserdetailsService', ['getUserNameFromToken']);

    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent, SidebarComponent, MainHeaderComponent],
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserdetailsService, useValue: userDetailsServiceSpy },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) },

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    userDetailsSpy = TestBed.inject(UserdetailsService) as jasmine.SpyObj<UserdetailsService>;
    matDrawerSpy = jasmine.createSpyObj('MatDrawer', ['toggle']);
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>; // Inject MatDialog mock

    userDetailsSpy.getUserNameFromToken.and.returnValue(of('John Doe'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
  it('should initialize user data', () => {
    component.ngOnInit();

    expect(component.userData).toBeDefined();

    expect(component.userData.userName).toBeUndefined();
  });

  it('should initialize userName$ observable with user name from service', () => {
    component.ngOnInit();
    expect(component.userName$).toBeDefined();
    component.userName$.subscribe(userName => {
      expect(userName).toBe('John Doe');
    });
  });

  it('should toggle the sidenav drawer', () => {
    component.drawer = matDrawerSpy;
    component.toggleLayout();
    expect(matDrawerSpy.toggle).toHaveBeenCalled();
  });
});
