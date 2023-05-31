import { Component, OnInit } from '@angular/core';
import {InventarioService} from 'src/app/services/inventario.service'

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnInit {
  inventarioInfo:any
  listaProductos:any
  authenticated:boolean

  constructor(private inventarioService: InventarioService){
    this.authenticated=false
  }
  ngOnInit() {

    //se revisa si el usuario ya se registro
    const userData=window.localStorage.getItem("UserData");
    if(userData){
      this.authenticated=true

      this.inventarioService.getInventory(5).subscribe((response)=>{
        console.log(response)
        this.inventarioInfo=response;
      })
      this.inventarioService.getProducts(5).subscribe((response)=>{
        console.log(response)
        this.listaProductos=response;
      })
    }else{

    }
   
  }

}
