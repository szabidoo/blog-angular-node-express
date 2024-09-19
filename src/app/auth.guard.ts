import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   const isLoggedIn = this.authService.isLoggedIn();
  //   console.log('AuthGuard: isLoggedIn value:', isLoggedIn);

  /*
    Az isLoggedIn itt Observable. Az Observable-ök "értékét" így nem tudod vizsgálni.
    Itt az if-nek feltételként adva annyit vizsgált, hogy truthy-e az isLoggedIn
    (szóval nem undefined, null, stb., erre van egy lista, hogy mi truthy és mi falsy)
  */

  //   if (isLoggedIn) {
  //     return true;
  //   } 
  //   else {
  //     return false;
  //   }
  // }

  /*
    A canActivate visszaadhat Observable<boolean>-t vagy Promise<boolean>-t is,
    és az Angular képes "belőlük kiszedni" a valós értéket, tehát a boolean-t.
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn$().pipe(
      map((isLoggedIn) => {
        const allow = state.url === '/login' ? !isLoggedIn : isLoggedIn;

        if (!allow) {
          const redirectRoute = isLoggedIn ? '/home' : '/login';
          this.router.navigate([redirectRoute]);
        }

        return allow;
      })
    );
  }
}