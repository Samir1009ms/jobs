import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  constructor(public http: HttpClient) { }


  getVacancies(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/vacancies');
  }
  

}
