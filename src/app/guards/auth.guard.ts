import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserdetailsService } from '../services/userdetails.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isLoggedin()){
    return true;
  }
  router.navigateByUrl('main/login');
  return false;
};

export const passwordChangeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(localStorage.getItem('password-token')!=null){
    return true;
  }
  router.navigateByUrl('main/forgot-password');
  return false;
}

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const openSnackBar = inject(MatSnackBar);
  if(authService.checkAdminRole())return true;
  if(authService.checkUserRole()){
    openSnackBar.open('User not authorized','close');
    router.navigateByUrl('user/home');
  }
  else router.navigateByUrl('main/home');
  return false;
}

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.checkUserRole())return true;
  router.navigateByUrl('main/home');
  return false;
}
