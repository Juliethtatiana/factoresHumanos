import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ProveedorService} from 'src/app/services/proveedor.service'
import {ProductoService} from 'src/app/services/producto.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  listaProveedores: any

  productForm:FormGroup

  constructor(
    private proveedorService: ProveedorService,
    private productoService:ProductoService,
    private formBuilder:FormBuilder){
      this.productForm = this.formBuilder.group({
        nombreProducto:'',
        descripcion:'',
        precioUnitario:0,
        proveedorIdProveedor:0
      });

  }
  ngOnInit(): void {
    this.proveedorService.list().subscribe((response)=>{
      this.listaProveedores=response
    })
    
  }

  onSubmit():void{
    
    const producto = {
      nombreProducto: this.productForm.value.nombreProducto,
      descripcion: this.productForm.value.descripcion,
      precioUnitario: parseInt( this.productForm.value.precioUnitario),
      proveedorIdProveedor:parseInt(this.productForm.value.proveedorIdProveedor)
    };
    console.log(producto)
    this.productoService.new(producto).subscribe((response) => {
      if (response.statusCode === 200) {
        Swal.fire('Listo', response.message, 'success');
      }else{
        Swal.fire('Error', 'Tenemos problemas para crear el producto', 'error');
      }
    });

  }

}
