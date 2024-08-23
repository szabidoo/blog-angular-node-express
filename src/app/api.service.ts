import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Update to the correct URL

  constructor(private http: HttpClient) {}

  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/data`, {data}); // Update to the correct endpoint
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/postdata`, {data: postData})
  }

  getPosts(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/getposts`)
  }
}