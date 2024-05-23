import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserdetailsService {
  // BehaviorSubjects to store user-related data
  private name$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string[]>([]);
  private userName$ = new BehaviorSubject<string>('');

  constructor() {}

  // Get the user's name from the stored data as an observable
  public getNameFromToken() {
    
    return this.name$.asObservable();
  }

  // Set the user's name in the stored data
  public setNameFromToken(name: string) {
    this.name$.next(name);
  }

  // Get the user's role from the stored data as an observable
  public getRoleFromToken() {
    return this.role$.asObservable();
  }

  // Set the user's role in the stored data
  public setRoleFromToken(roles: any[]) {
    this.role$.next(roles);
  }

  // Get the user's username from the stored data as an observable
  public getUserNameFromToken() {
    return this.userName$.asObservable();
  }

  // Set the user's username in the stored data
  public setUserNameFromToken(userName: string) {
    this.userName$.next(userName);
  }
}
