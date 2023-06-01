import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-all-inventarios',
  templateUrl: './all-inventarios.component.html',
  styleUrls: ['./all-inventarios.component.css']
})
export class AllInventariosComponent implements OnInit{
  listaInventarios:any
  authenticated:boolean
  user:any
  
  constructor(private inventarioService: InventarioService){
    this.authenticated=false;
  }
   
  
  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    
    if(userData){
      this.authenticated=true
      this.inventarioService.list().subscribe((response)=>{
        console.log(response)
        this.listaInventarios=response;
      })
    }
    }



    
}
