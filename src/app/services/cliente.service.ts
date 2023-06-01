import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type client={
    nombreCliente:string
    direccionCliente:string
    telefonoCliente:number
}

@Injectable({
  providedIn: 'root'
})


export class ClientService {

  readonly api="http://localhost:3000/cliente"

  constructor(private http: HttpClient) { 
  }

  new(cliente:client):Observable<any>{
    return this.http.post<any>(this.api , cliente);
  }
}
