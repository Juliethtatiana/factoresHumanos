import { Component, OnInit } from '@angular/core';
import {InventarioService} from 'src/app/services/inventario.service'

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnInit {

  listaInventarios:any

  constructor(private inventarioService: InventarioService){

  }
  ngOnInit() {
    this.inventarioService.list().subscribe((response)=>{
      console.log(response)
      this.listaInventarios=response;
    })
  }

}
