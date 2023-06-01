import { Component} from '@angular/core';


@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})

export class VentasListComponent{
  idVenta=0
  nombreCliente=""
  fecha=""
  total=0
    
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
  
    /* Hacer algo con los datos obtenidos, como mostrarlos en la consola
    console.log('Datos de la fila seleccionada:');
    console.log('idVenta:', this.idVenta);
    console.log('Nombre Cliente:', this.nombreCliente);
    console.log('Fecha:', this.fecha);
    console.log('Total ($):', this.total);*/
  }

  abrirOperacion() {
    // Llamar a la ventana detalle de venta
    console.log('Operación de abrir ejecutada');
  }
   
}


