import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginStateResponse {
  data: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; // Update to the correct URL

  constructor(private http: HttpClient) {}

  loginData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/data`, {data});
  }

  logout(): Observable<boolean> {
    console.log(`${this.apiUrl}/api/logout`)
    return this.http.get<any>(`${this.apiUrl}/api/logout`);
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

  loginState(): Observable<LoginStateResponse> {
    return this.http.get<LoginStateResponse>(`${this.apiUrl}/api/loginstate`);
  }
}