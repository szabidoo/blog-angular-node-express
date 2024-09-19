import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  //Töröltem a back_data-t igazából nem volt szükség tárolni, lekezeltük amikor érkeztek a válaszok.
  loginData: any;
  username = '';
  password = '';
  active_user: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

/*
 -  Mivel szemantikailag nem egy listát küldünk, érdemes valóban nem egy listát (tömböt)
    küldeni. Sokat javít a kód olvashatóságán / karbantarthatóságán frontenden és backenden is.

  - A subscribenak nem csak egy függvény adható paraméterként, hanem egy objektum is
    next illetve error függvényekkel. Ilyenkor ha az observable, amire feliratkozunk,
    hibát dob, akkor az error függvény hívódik meg, egyébként a next. A hiba dobását
    az Angularos HttpClient get, post stb. metódusai dobják ha a válaszban hibakód érkezik.

  - Észrevehetted, hogy az AuthService-en hívom meg a login$ metódust és nem az ApiService-en.
    Az ApiService az egy alacsonyabb absztrakciós szint, a kommunikációért felel, ezzel
    nem kellene a komponenseknek törődnie. A komponens nem akar kommunikálni, hanem bejelentkezni
    szeretne. Így a magasabb absztrakciós szintű AuthService-t használja. Remélem kb
    érthető :D A service-ek is módosultak, ha még nem nézted volna őket.
*/
  login() {
    const data = { username: this.username, password: this.password };
    this.authService.login$(data)
      .subscribe({
        next: () => this.handleSuccessFulLogin(),
        /*
          Nyilván a hibát szebben kellene kezelni (pl megjeleníteni error komponenst
          vagy bármi), az alert csak gyors példa.
        */
        error: (err) => alert(err.message),
      });
  }

  registerUser() {
    const data = { username: this.username, password: this.password };
    this.apiService.registerUser$(data).pipe(
      /*
        Ha hibát jelző HTTP status kódot kapunk vissza, akkor lefut a catchError
        operátorban megadot callback fgv
      */
      catchError((err) => {
        console.log(err.error.message);
        //Egy javascript Error objektumot tovább passzolunk a következő operátornak
        return of(new Error(err.error.message));
      }),
      switchMap((response) =>
        /*
          A switchMap operátor arra jó, hogy az eredeti Observable (amin a .pipe()-ot
          hívtuk) eredményét felhasználva, vagy attól függően úgymond "áttérjünk" egy
          másik Observable-re. Ha a switchMap után nem jön másik operátor, akkor a
          subscribe-ban ennek az eredményét kapjuk. Ha jön másik operátor, akkor az
          a switchMap callback-jében visszaadott Observable eredményét kapja meg bemenetként.
          
          ----------------

          Ha Error típusú a válasz, az azt jelenti, hogy a catchError lefutott,
          akkor az of() fgv-nyel Observable-lé alakítjuk és továbbpasszoljuk.

          Ha nem Error típusú a válasz, akkor az apiService.login$() által visszaadott
          Observable-t passzoljuk tovább (ugye az observable egy HTTP kérés eredménye a 
          login$ metódusnál, szóval megtörténik a bejelentkeztetés szerveroldalon).
        */
        response instanceof Error ? of(response) : this.apiService.login$(data)
      ),
    ).subscribe((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        this.handleSuccessFulLogin();
      }
    });
  }

  private handleSuccessFulLogin(): void {
    this.active_user = this.username;
    sessionStorage.setItem("username", this.active_user);
    this.router.navigate(['/home']);
  }
}
