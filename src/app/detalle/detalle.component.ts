import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ProductoService} from 'src/app/services/producto.service';
import { VentaService} from 'src/app/services/venta.service'
import { ActivatedRoute } from '@angular/router';


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
  idVenta:number
  ventaInfo:any

  constructor(
      private productoService: ProductoService,
      private ventaService: VentaService,
      private route: ActivatedRoute,
      ){
     this.idVenta= this.route.snapshot.params['id'];

  }
    
  ngOnInit(): void {
     this.ventaService.getInfo(Number(this.idVenta)).subscribe((response)=>{
        if(response){
          this.ventaInfo=response
          this.ventaService.getProd(this.ventaInfo.idventa).subscribe((response)=>{
            this.listaProductos=response
            console.log(this.listaProductos)
          })
        }
     })
      
      this.nombreCliente = "john"
      this.factura = 1
      this.fechaHoy = new Date().toISOString().split('T')[0];
      this.costoTotal = 1000;
  }
}
