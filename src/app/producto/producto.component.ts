import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ProveedorService} from 'src/app/services/proveedor.service'
import {ProductoService} from 'src/app/services/producto.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  listaProveedores: any
  productForm:FormGroup
  authenticated:boolean
  user:any
  speech:any
  constructor(
    private router: Router,
    private proveedorService: ProveedorService,
    private productoService:ProductoService,
    private formBuilder:FormBuilder){
      this.speech= new SpeechSynthesisUtterance();
      this.productForm = this.formBuilder.group({
        nombreProducto:'',
        descripcion:'',
        precioUnitario:0,
        proveedorIdProveedor:0
      });

      this.authenticated=false
  }
  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    
    if(userData){
      this.authenticated=true
      this.user=JSON.parse(userData)
      this.proveedorService.list().subscribe((response)=>{
        this.listaProveedores=response
      })
    }     
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
        this.speak('Listo'+ response.message)
        this.router.navigate(['/inv']);
      }else{
        Swal.fire('Error', 'Tenemos problemas para crear el producto', 'error');
        this.speak('Error'+ 'Tenemos problemas para crear el producto')
        this.router.navigate(['/inv']);
      }
    });

  }
  speak(msg:string){
    
    if(localStorage.getItem("speech")=="true"){
      this.speech.text=msg
      speechSynthesis.speak(this.speech);
    }
  
   }

}
