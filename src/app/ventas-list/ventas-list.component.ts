import { Component, OnInit} from '@angular/core';
import { VentaService } from '../services/venta.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})

export class VentasListComponent implements OnInit{

  idVenta=0
  nombreCliente=""
  fecha=""
  total=0
  authenticated:boolean
  user:any
  listaVentas:any

  constructor(
    private ventaService: VentaService ,
    private router: Router,
  ){
    this.authenticated=false
  }

  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    const idInv=window.localStorage.getItem("idInventario");
    if(userData && idInv){
      this.authenticated=true
      this.ventaService.getSells(Number(idInv)).subscribe((response)=>{
        if(response){
          this.listaVentas=response
        }
      }) 
    }    
  }
    
    obtenerDatosFila(event: any) {
    const fila = event.target.parentNode;
    // Elimina la clase de las filas previamente seleccionadas
    const filasSeleccionadas = document.querySelectorAll('.fila-seleccionada');
    filasSeleccionadas.forEach(fila => fila.classList.remove('fila-seleccionada'));
  
    // Agrega la clase a la fila seleccionada
    fila.classList.add('fila-seleccionada');
  
    // Accede a los datos de la fila seleccionada
    this.idVenta = fila.cells[0].innerText;
    this.nombreCliente = fila.cells[1].innerText;
    this.fecha = fila.cells[2].innerText;
    this.total = fila.cells[3].innerText;
  
   
  }

  abrirOperacion() {
    // Llamar a la ventana detalle de venta
    this.router.navigate(['/detalle/'+ this.idVenta]);
  }
   
}


