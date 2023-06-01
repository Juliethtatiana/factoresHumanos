import { Component, OnInit } from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {InventarioService} from 'src/app/services/inventario.service'
import { invProdData } from '../types/invProd';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-inventario',
  templateUrl: './registrar-inventario.component.html',
  styleUrls: ['./registrar-inventario.component.css']
})
export class RegistrarInventarioComponent implements OnInit {
  inventarioInfo:any
  listaProductos:any
  invProdForm:FormGroup
  authenticated:boolean
  user:any
  administrator:boolean

  constructor(
    private productoService: ProductoService,
    private inventarioService: InventarioService,
    private formBuilder:FormBuilder){
      this.authenticated=false
    this.administrator=false
      this.invProdForm = this.formBuilder.group({
        cantidad_inv:0,
        cantidad_vend:0,
        updated:"",
        inventarioIdinventario:0,
        productoIdproducto:0
      });

    }
    
  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    if(userData){
      this.authenticated=true
      this.user=JSON.parse(userData)
    this.productoService.list().subscribe((response)=>{
      this.listaProductos=response
    })
    this.inventarioService.getInventorybyUser(Number(this.user.idusuario)).subscribe((response)=>{
      console.log(response)
      this.inventarioInfo=response;
    })
  }
  }

  onSubmit():void{
    
    const producto = {
      cantidad_inv: this.invProdForm.value.cantidad_inv,
      cantidad_vend: 0,
      updated: new Date(),
      inventarioIdinventario:this.inventarioInfo? this.inventarioInfo.idinventario:0  ,
      productoIdproducto:Number(this.invProdForm.value.productoIdproducto)
    };
    console.log(producto)
    this.inventarioService.createInvProd(producto).subscribe((response)=>{
      console.log(response)
  
        if(response.status){
          Swal.fire('Error', response.message, 'error');
        }else{
          Swal.fire('listo', 'producto registrado satisfactoriamente', 'success');
        }
        
      
     
    })
  }

}
