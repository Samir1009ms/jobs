import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTest(category: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/questions/random/category/${category}`);
  }

  uploadTest(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/candidates`, data);
  }
}
