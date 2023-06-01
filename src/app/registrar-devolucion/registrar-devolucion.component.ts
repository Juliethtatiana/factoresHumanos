import { Component, OnInit } from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {InventarioService} from 'src/app/services/inventario.service';
import { invProdData } from '../types/invProd';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-Devolucion',
  templateUrl: './registrar-Devolucion.component.html',
  styleUrls: ['./registrar-Devolucion.component.css']
})
export class RegistrarDevolucionComponent implements OnInit {

  listaProductos:any
  invProdForm:FormGroup
  idInventario:any
  userData:any

  constructor(
    private productoService: ProductoService,
    private inventarioService: InventarioService,
    private formBuilder:FormBuilder){
      this.invProdForm = this.formBuilder.group({
        cantidad_inv: 0,
        cantidad_vend: 0,
        updated: new Date(),
        inventarioIdinventario:5,
        productoIdproducto:0
     });

    }
    
  ngOnInit(): void {
    this.idInventario=Number(window.localStorage.getItem("idInventario"))
    this.userData= window.localStorage.getItem('UserData')
    this.inventarioService.getProducts(this.idInventario).subscribe((response)=>{
      this.listaProductos=response
    })
  }

  onSubmit():void{
    const producto = {
      cantidad_inv: this.invProdForm.value.cantidad_inv,
      cantidad_vend: 0,
      updated: new Date(),
      inventarioIdinventario:5,
      productoIdproducto:Number(this.invProdForm.value.productoIdproducto)
    };
   
    this.inventarioService.createInvProd(producto).subscribe((response)=>{
      console.log(response)
  
        if(response.status){
          Swal.fire('Error', response.message, 'error');
        }else{
          Swal.fire('listo', 'Devolucion registrado satisfactoriamente', 'success');
        }
        
      
     
    })
  }

}
