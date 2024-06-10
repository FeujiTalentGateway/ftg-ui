import { Injectable } from '@angular/core';
import { GoogleUser } from '../models/google-user.model';
import { AuthService } from './auth.service';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginService {

  constructor(private authService: AuthService) { }

  loadGoogleSignInScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  initializeGoogleSignInButton(callback: (response: any) => void) {
    google.accounts.id.initialize({
      client_id: '842949696777-b3duehfjqha22vsqefbp2ql8lnisgeaa.apps.googleusercontent.com',
      callback: callback,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'circle',
        width: '150',
      }
    );
  }

  handleGoogleCredentialResponse(response: any) {
    if (response) {
      const googleUser: GoogleUser = this.decodeToken(response.credential);
      this.authService.loginWithGoogle(googleUser);
    }
  }

  decodeToken(token: string): GoogleUser {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      name: decodedToken.name,
      emailId: decodedToken.email,
      password: btoa(decodedToken.sub),
      isActive: decodedToken.email_verified,
    };
  }
}
