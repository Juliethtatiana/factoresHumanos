import { Component, OnInit } from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {productoData} from 'src/app/types/producto';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})

export class RegistrarVentaComponent implements OnInit{

  listaProductos:any
  addProdForm:FormGroup
  datosTabla: any[] = [];
  

  constructor(
    private productoService: ProductoService,
    private formBuilder:FormBuilder
    ){
      this.addProdForm = this.formBuilder.group({
        productoIdproducto:0,
        nameproducto:"",
        precioUnd:0,
        cantidad:0,
        total:0,
      });
      
    }

  ngOnInit(): void {
    this.productoService.list().subscribe((response)=>{
      this.listaProductos=response
    })
  }

  onSubmit(event: any): void {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    const botonPresionado = event.submitter.name;
    
    if (botonPresionado === 'add') {
            
      const nuevaFila = {
        productoIdproducto: this.addProdForm.value.productoIdproducto,
        nameproducto:this.addProdForm.value.nameproducto,
        precioUnd:this.addProdForm.value.precioUnd,
        cantidad:this.addProdForm.value.cantidad,
        total:this.addProdForm.value.total
      };

      
      const producto = this.listaProductos.filter((producto: productoData) => {
        return producto.idproducto === this.addProdForm.value.productoIdproducto;
      });
      
      this.datosTabla.push(nuevaFila);

    } else if (botonPresionado === 'boton2') {
      // Acciones específicas para el Botón 2
      console.log('Se presionó el Botón 2');
    }
  }
}
