import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export type Credentials = { username: string, password: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
    Itthagyom az isAuthenticated-et, de végeredményben felesleges, mivel nem mi fogjuk
    manuálisan tárolni, hogy bejelentkezett-e egy felhasználó vagy sem, hanem a 
    server-től fogjuk lekérni az infót. Azért hagyom itt, mert az alábbi kommentem
    fontos (még azelőtt írtam, hogy rájöttem, hogy nem fog kelleni :P):

    Ez mindenképp legyen private. Ha nincs megadva egy tagváltozó (vagy metódus) láthatósága
    akkor alapértelmezetten public lesz. Ha public a BehaviorSubject, akkor más service-ek vagy
    component-ek tudnak rajta next-et hívni, amit nyilván nem szeretnénk.
  */
  // private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router, private api: ApiService) {  }

  login$(data: Credentials): Observable<any> {
    return this.api.login$(data);
  }

  logout$(): Observable<any> {
    return this.api.logout$();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.api.isLoggedIn$();
  }
}