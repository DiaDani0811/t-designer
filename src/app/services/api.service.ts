import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, JSON.stringify(body));
  }
  get(path: string): Observable<any> {
    return this.http.get(path)
  }
}
