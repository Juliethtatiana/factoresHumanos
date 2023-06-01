import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type venta={
    fecha:Date
    valor:number
    clienteIdCliente:number
    inventarioIdinventario:number
    vendedorIdusuario:number
}
type ventaprod={
    cantidad:number
    productoIdproducto:number
    ventaIdventa:number
  }

@Injectable({
  providedIn: 'root'
})


export class VentaService {

  readonly api="http://localhost:3000/venta"
  readonly api2="http://localhost:3000/ventaprod"

  constructor(private http: HttpClient) { 
  }

  new(venta:venta):Observable<any>{
    return this.http.post<any>(this.api , venta);
  }
  addProd(ventaprod:ventaprod):Observable<any>{
    return this.http.post<any>(this.api2 , ventaprod);
  }
}
