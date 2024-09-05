import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {  }

  login() {
    this.isAuthenticated.next(true);
    this.router.navigate(['/home']);
    console.log("AuthService login() called, " + this.isAuthenticated.getValue())
  }

  logout() {
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    console.log('AuthService: Checking if user is logged in:', this.isAuthenticated.getValue());
    return this.isAuthenticated.asObservable();
  }
}