import { Component, OnInit } from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {InventarioService} from 'src/app/services/inventario.service'
import { invProdData } from '../types/invProd';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrar-inventario',
  templateUrl: './registrar-inventario.component.html',
  styleUrls: ['./registrar-inventario.component.css']
})
export class RegistrarInventarioComponent implements OnInit {

  listaProductos:any
  invProdForm:FormGroup

  constructor(
    private productoService: ProductoService,
    private inventarioService: InventarioService,
    private formBuilder:FormBuilder){
      this.invProdForm = this.formBuilder.group({
        cantidad_inv:0,
        cantidad_vend:0,
        updated:"",
        inventarioIdinventario:0,
        productoIdproducto:0
      });

    }
    
  ngOnInit(): void {
    this.productoService.list().subscribe((response)=>{
      this.listaProductos=response
    })
  }

  onSubmit():void{
    const producto = {
      cantidad_inv: this.invProdForm.value.nombreProducto,
      cantidad_vend: 0,
      updated: new Date(),
      inventarioIdinventario:5,
      productoIdproducto:this.invProdForm.value.nombreProducto
    };
    console.log()
    /*this.inventarioService.createInvProd(data).subscribe((response)=>{
      console.log(response)
    })*/
  }

}
