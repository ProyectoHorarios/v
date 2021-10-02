import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInfoService {

  constructor(private http:HttpClient) { }

  getAgignaturas():Observable<any>{
    return this.http.get('https://horarios-b18ea-default-rtdb.firebaseio.com/grupos.json')
  }

  getGrupos():Observable<any>{
    return this.http.get('https://horarios-b18ea-default-rtdb.firebaseio.com/g.json')
  }
}
