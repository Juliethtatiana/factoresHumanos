import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';

@Component({
  selector: 'app-all-inventarios',
  templateUrl: './all-inventarios.component.html',
  styleUrls: ['./all-inventarios.component.css']
})
export class AllInventariosComponent implements OnInit{
  constructor(private inventarioService: InventarioService){}
  
  listaInventarios:any

  ngOnInit(): void {
    this.inventarioService.list().subscribe((response)=>{
      console.log(response)
      this.listaInventarios=response;
    })
  }
}
