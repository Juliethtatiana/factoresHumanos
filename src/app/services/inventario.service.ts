import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { invProdData } from '../types/invProd';

export type updateinv={
  cantidad_vend?:number,
  cantidad_inv?:number
}

@Injectable({
  providedIn: 'root'
})


export class InventarioService {

  readonly api="http://localhost:3000/inventario"
  readonly apiInvProd="http://localhost:3000/invprod/"

  constructor(private http: HttpClient) { 
  }

  list():Observable<any>{
    return this.http.get<any>(this.api);
  }

  getInventory(idInventario:number):Observable<any>{
    return this.http.get<any>(this.api+ "/"+idInventario)
  }
  getInventorybyUser(userId:number):Observable<any>{
    return this.http.get<any>(this.api+ "/user/"+userId)
  }

  getProducts(idInventario:number): Observable<any>{
    return this.http.get<any>(this.apiInvProd+idInventario)
  }

  createInvProd(data: invProdData){
    return this.http.post<any>(this.apiInvProd,data)
  }

  updateCantVend(id:number, data:updateinv){
    return this.http.patch<any>(this.apiInvProd  + id, data)
  }

  getInvProd(idInv:number, idProd:number){
    return this.http.get<any>(this.apiInvProd+ "register/" +idInv + "/"+ idProd)
  }

 
}
