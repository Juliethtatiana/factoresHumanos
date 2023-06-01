import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {productoData} from 'src/app/types/producto';
import {InventarioService} from 'src/app/services/inventario.service'

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})

export class RegistrarVentaComponent implements OnInit{

  listaProductos:any
  addProdForm:FormGroup
  addVenta:FormGroup
  totalVenta=0
  datosTabla: any[] = [];
  venta: any[] = [];
  
  constructor(
    private productoService: ProductoService,
    private formBuilder:FormBuilder,
    ){
      
      this.addProdForm = this.formBuilder.group({
        productoIdproducto:0,
        nameproducto:"",
        precioUnd:0,
        cantidad:0,
        total:0,
      });

      this.addVenta = this.formBuilder.group({
        idVenta:"FE55",
        fecha:"",
        nombreCliente:"",
        totalVenta:0,
        vendedor:"",
      });
      
    }

  ngOnInit(): void {
    this.productoService.list().subscribe((response)=>{
      this.listaProductos=response
    })
    this.addVenta.value.totalVenta;
  }

  onSubmit(event: any): void {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    const botonPresionado = event.submitter.name;
    
    if (botonPresionado === 'add') {            
      const producto = this.listaProductos;
      let i;
      for (i = 0; i < producto.length; i++) {
        if((parseInt(producto[i].idproducto))==(parseInt(this.addProdForm.value.productoIdproducto))){
          break;
        }
      }
      console.log(producto);
      
      const nuevaFila = {
        productoIdproducto: this.addProdForm.value.productoIdproducto,
        nameproducto:producto[i].nombreProducto,
        precioUnd:producto[i].precioUnitario,
        cantidad:this.addProdForm.value.cantidad,
        total:parseInt(this.addProdForm.value.cantidad)*parseInt(producto[i].precioUnitario)
      };
      this.datosTabla.push(nuevaFila);
      this.totalVenta=this.totalVenta+nuevaFila.total;
      this.addVenta.value.totalVenta=this.totalVenta;
      

    } else if (botonPresionado === 'registrar') {
      const nuevaVenta={
        idVenta:this.addVenta.value.idVenta,
        fecha:this.addVenta.value.fecha,
        nombreCliente:this.addVenta.value.nombreCliente,
        totalVenta:this.addVenta.value.totalVenta,
        vendedor:this.addVenta.value.vendedor,
      }
      this.venta.push(nuevaVenta);
      this.venta.push(this.datosTabla);
      
      console.log(this.venta);
      

    }
  }
}
