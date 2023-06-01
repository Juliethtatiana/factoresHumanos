import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ProductoService} from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

 
  nombreCliente: string | undefined;
  fechaHoy: string | undefined;
  costoTotal: number | undefined;
  factura: number | undefined;
  listaProductos: any
  invProdForm: FormGroup;

  constructor(
      private productoService: ProductoService,
      private formBuilder:FormBuilder){
      this.invProdForm = this.formBuilder.group({
        updated:"",
        inventarioIdinventario:0,
        productoIdproducto:0
      });

  }
    
  ngOnInit(): void {
      this.productoService.list().subscribe((response)=>{
      this.listaProductos=response})
      this.nombreCliente = "john"
      this.factura = 1
      this.fechaHoy = new Date().toISOString().split('T')[0];
      this.costoTotal = 1000;
  }
}