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
  authenticated:boolean
  user:any

  constructor(
    private productoService: ProductoService,
    private inventarioService: InventarioService,
    private formBuilder:FormBuilder){
      this.authenticated=false;
      this.invProdForm = this.formBuilder.group({
        conceptoProd: "",
        productoIdproducto:0,
        cantidad:0
     });

    }
    
  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    
    if(userData){
      this.authenticated=true
      this.idInventario=Number(window.localStorage.getItem("idInventario"))
      this.userData= window.localStorage.getItem('UserData')
      this.inventarioService.getProducts(this.idInventario).subscribe((response)=>{
        this.listaProductos=response
      })
    }
  }

  onSubmit():void{


    const devolucion = {
      conceptoProd: this.invProdForm.value.conceptoProd,
        productoIdproducto:Number(this.invProdForm.value.productoIdproducto),
        cantidad:Number(this.invProdForm.value.cantidad)
    };
    console.log(devolucion.conceptoProd)
    
   if(devolucion.conceptoProd=="STOCK"){
    this.inventarioService.getInvProd(this.idInventario,devolucion.productoIdproducto).subscribe((response)=>{
      console.log(response)
      if(devolucion.cantidad <= response.cantidad_inv){
        const update={
          cantidad_inv: response.cantidad_inv-Number(devolucion.cantidad)
        }
        const cant_vend=response.cant_vend
        this.inventarioService.updateCantVend(response.idInvProd, update).subscribe((response)=>{
          if(response){
            const producto = {
              cantidad_inv: devolucion.cantidad,
              cantidad_vend: 0,
              updated: new Date(),
              inventarioIdinventario:2,
              productoIdproducto:Number(this.invProdForm.value.productoIdproducto)
            };
            console.log(producto)
            this.inventarioService.createInvProd(producto).subscribe((response)=>{
              if(response){
                Swal.fire('Listo',"Devolucion registrada", 'success');
              }
              
            })
            
          }
        })
      }else{
        Swal.fire('Error',"la cantidad ingresada es menor a la del inventario", 'error');
      }
     
    })

   }else if(devolucion.conceptoProd=="VENDIDO"){
    this.inventarioService.getInvProd(this.idInventario,devolucion.productoIdproducto).subscribe((response)=>{
      console.log(response)
      if(devolucion.cantidad <= response.cantidad_vend){
        const update={
          cantidad_vend: response.cantidad_vend-Number(devolucion.cantidad)
        }
        const cant_vend=response.cant_vend
        this.inventarioService.updateCantVend(response.idInvProd, update).subscribe((response)=>{
          if(response){
            const producto = {
              cantidad_inv: devolucion.cantidad,
              cantidad_vend: 0,
              updated: new Date(),
              inventarioIdinventario:2,
              productoIdproducto:Number(this.invProdForm.value.productoIdproducto)
            };
            console.log(producto)
            this.inventarioService.createInvProd(producto).subscribe((response)=>{
              if(response){
                Swal.fire('Listo',"Devolucion registrada", 'success');
              }
              
            })
            
          }
        })
      }else{
        Swal.fire('Error',"la cantidad ingresada es menor a la vendida", 'error');
      }
     
    })
   }
    
  }

}
