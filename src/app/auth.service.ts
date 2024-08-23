// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
    console.log('Auth done')
    this.router.navigate(['/home'])
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    console.log("isLoggedIn called")
    return this.isAuthenticated || !!sessionStorage.getItem("username");
  }

}