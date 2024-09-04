import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');
    const isLoggedIn = this.authService.isLoggedIn();
    console.log('AuthGuard: isLoggedIn value:', isLoggedIn);
    if (isLoggedIn) {
      console.log('AuthGuard: User is logged in');
      return true;
    } else {
      console.log('AuthGuard: User is not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}