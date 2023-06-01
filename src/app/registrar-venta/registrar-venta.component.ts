import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ProductoService} from 'src/app/services/producto.service';
import {ClientService} from 'src/app/services/cliente.service';
import {VentaService} from 'src/app/services/venta.service'
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
  idCliente:any
  idInventario:any 
  invProd:any
  userData:any
  authenticated:boolean
  user:any
  administrator:boolean
  
  constructor(
    private inventarioService: InventarioService,
    private ventaService: VentaService,
    private clienteService: ClientService,
    private formBuilder:FormBuilder,
    ){
      this.authenticated=false
      this.administrator=false
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
        direccionCliente:"",
        documentoCliente:0,
        telefonoCliente:0,
        totalVenta:0,
        vendedor:"",
      });
      
    }

  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    if(userData){
      this.authenticated=true
      this.user=JSON.parse(userData)
      this.addVenta.value.totalVenta;
      this.idInventario=Number(window.localStorage.getItem("idInventario"))
      this.inventarioService.getProducts(this.idInventario).subscribe((response)=>{
        this.listaProductos=response
      })
    }else{
      this.authenticated=false
    }
  }

  onSubmit(event: any): void {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    const botonPresionado = event.submitter.name;
    
    if (botonPresionado === 'add') {            
      const producto = this.listaProductos;

      console.log(producto)
      let i;
      for (i = 0; i < producto.length; i++) {
        if((parseInt(producto[i].productoIdproducto))==(parseInt(this.addProdForm.value.productoIdproducto))){
          break;
        }
      }
      console.log(producto);
      
      const nuevaFila = {
        productoIdproducto: this.addProdForm.value.productoIdproducto,
        nameproducto:producto[i].producto.nombreProducto,
        precioUnd:producto[i].producto.precioUnitario,
        cantidad:this.addProdForm.value.cantidad,
        total:parseInt(this.addProdForm.value.cantidad)*parseInt(producto[i].producto.precioUnitario)
      };
      this.datosTabla.push(nuevaFila);
      this.totalVenta=this.totalVenta+nuevaFila.total;
      this.addVenta.value.totalVenta=this.totalVenta;
      

    } else if (botonPresionado === 'registrar') {
      //creacion de cliente
      const clientData={
        nombreCliente:this.addVenta.value.nombreCliente,
        direccionCliente:this.addVenta.value.direccionCliente,
        telefonoCliente:Number(this.addVenta.value.telefonoCliente)
      }
      this.clienteService.new(clientData).subscribe((response)=>{
       if(response.statusCode===200){
          const user= JSON.parse(this.userData)
          const ventaData={
            fecha:new Date(),
            valor:this.totalVenta,
            clienteIdCliente:response.id,
            inventarioIdinventario:this.idInventario,
            vendedorIdusuario:user?Number(user.idusuario):0
            
          }
          this.ventaService.new(ventaData).subscribe((response)=>{
              if(response.statusCode ===200){
                let i:number;
                for (i = 0; i < this.datosTabla.length; i++) {
                  console.log(this.datosTabla[i])
                  const ventaProdData={
                    cantidad:Number(this.datosTabla[i].cantidad),
                    productoIdproducto:Number(this.datosTabla[i].productoIdproducto),
                    ventaIdventa:response.id
                  }
                  console.log(ventaProdData.productoIdproducto)
                  this.ventaService.addProd(ventaProdData).subscribe((response)=>{
                    if(response.statusCode===200){
                      console.log("holi")
                      this.inventarioService.getInvProd(this.idInventario,Number(ventaProdData.productoIdproducto)).subscribe((response)=>{
                        if(response){
                          const update={
                            cantidad_vend: Number(ventaProdData.cantidad)
                          }
                          this.inventarioService.updateCantVend(response.idInvProd, update).subscribe((response)=>{
                            console.log(response)
                            if(response){
                              this.invProd=response.idInvProd
                            }
                          })
                        }

                      })
                      
                    }
                  })
                }
                
              }
          })
       }
      })


     
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
