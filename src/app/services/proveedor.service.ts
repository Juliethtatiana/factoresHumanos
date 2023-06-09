import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  readonly api="http://localhost:3000/proveedor"

  constructor(private http: HttpClient) { 
  }

  list():Observable<any>{
    return this.http.get<any>(this.api);
  }

 
}
