import { TestBed } from '@angular/core/testing';
import { UserdetailsService } from './userdetails.service';

describe('UserdetailsService', () => {
  let service: UserdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserdetailsService]
    });
    service = TestBed.inject(UserdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user name', (done: DoneFn) => {
    const testName = 'John Doe';
    service.setNameFromToken(testName);

    service.getNameFromToken().subscribe(name => {
      expect(name).toBe(testName);
      done();
    });
  });

  it('should set and get user roles', (done: DoneFn) => {
    const testRoles = ['admin', 'user'];
    service.setRoleFromToken(testRoles);

    service.getRoleFromToken().subscribe(roles => {
      expect(roles).toEqual(testRoles);
      done();
    });
  });

  it('should set and get user username', (done: DoneFn) => {
    const testUserName = 'johndoe';
    service.setUserNameFromToken(testUserName);

    service.getUserNameFromToken().subscribe(userName => {
      expect(userName).toBe(testUserName);
      done();
    });
  });
});
