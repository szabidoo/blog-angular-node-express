import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface LoginStateResponse {
  data: boolean;
}

/*
  A metódusok nevének a végére a $-t egy naming convention miatt tettem oda.
  Azoknak a változóknak vagy függvényeknek a végére szokás odarakni, amik 
  Observable-re mutatnak (változó), vagy azt adnak vissza (fgv).
  Így használatkor egyértlmű, hogy observable-ként kell kezelni őket.
*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; // Update to the correct URL

  constructor(private http: HttpClient) {}

  //loginData -> login$: így egyértelműbb a metódus neve.
  login$(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, {data});
  }

  logout$(): Observable<boolean> {
    //Fura volt logout-olni GET metódussal, rákerestem neten, inkább POST-ot használnak erre.
    return this.http.post<any>(`${this.apiUrl}/api/logout`, null);
  }
  createPost$(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/postdata`, {data: postData})
  }

  getPosts$(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/getposts`)
  }

  registerUser$(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, {data})
  }

  //loginState -> isLoggedIn$: így egyértelműbb a metódus neve.
  isLoggedIn$(): Observable<boolean> {
    return this.http.get<LoginStateResponse>(`${this.apiUrl}/api/loginstate`).pipe(
      map((response) => response.data),
    );
  }
}