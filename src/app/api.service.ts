import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Update to the correct URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/data`, {data});
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/postdata`, {data: postData})
  }

  getPosts(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/getposts`)
  }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, {data})
  }

  loginState(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/api/data`);
  }

  getLoginState(): void {
    this.loginState()
    console.log(this.loginState())
    if(this.loginState()){
      this.authService.login()
      this.authService.isLoggedIn()
    }
  }
  

}