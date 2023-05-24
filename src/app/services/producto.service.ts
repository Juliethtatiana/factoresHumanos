import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productoData } from '../types/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly api="http://localhost:3000/producto"

  constructor(private http: HttpClient) { 
  }

  list():Observable<any>{
    return this.http.get<any>(this.api);
  }

  new(producto:productoData){
    return this.http.post<any>(this.api,producto)
  }

 
}
