import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiservice : ApiService) { }

  private currJsonsubject = new BehaviorSubject([]);
  public currJson = this.currJsonsubject.asObservable();
  getJson(){
    return this.apiservice.get('http://localhost:8000/sample')
  }

  getConfigData(){
    return this.apiservice.get("http://localhost:8000/submenu")
  }

  updateCurrentJson(value){
    this.currJsonsubject.next(value);
  }

}
