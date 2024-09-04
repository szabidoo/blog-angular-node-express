import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  

  constructor(private router: Router) {}

  login() {
    this.isAuthenticated.next(true);
    console.log('AuthService: User logged in, isAuthenticated:', this.isAuthenticated.getValue());
    this.router.navigate(['/home']);
  }

  logout() {
    this.isAuthenticated.next(false);
    console.log('AuthService: User logged out, isAuthenticated:', this.isAuthenticated.getValue());
  }

  isLoggedIn(): Observable<boolean> {
    const loggedIn = this.isAuthenticated.getValue();
    console.log('AuthService: Checking if user is logged in:', loggedIn);
    return this.isAuthenticated.asObservable();
  }
}