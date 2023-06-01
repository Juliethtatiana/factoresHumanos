import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type consec={
    rango_min:number
    rango_max:number
    numero_actual?:number
}

@Injectable({
  providedIn: 'root'
})


export class ConsecutivoService {

  readonly api="http://localhost:3000/consec_fact"

  constructor(private http: HttpClient) { 
  }

  new(consecutivo:consec):Observable<any>{
    return this.http.post<any>(this.api , consecutivo);
  }
}