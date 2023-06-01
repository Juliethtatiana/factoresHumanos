import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventarioListComponent } from './inventario-list/inventario-list.component';
import { RegistrarInventarioComponent } from './registrar-inventario/registrar-inventario.component';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { ProductoComponent} from './producto/producto.component';
import {NotAuthComponent} from './not-auth/not-auth.component'
import { AllInventariosComponent} from './all-inventarios/all-inventarios.component'
import { DetalleComponent } from './detalle/detalle.component';
import {RegistrarDevolucionComponent} from "./registrar-devolucion/registrar-devolucion.component"
import {ConsecutivoComponent} from "./Consecutivo/consecutivo.component"


const routes: Routes = [ {
  path: "",
  component: LoginComponent 
},
{ path: 'inv', component: InventarioListComponent },
{ path: 'regInv', component: RegistrarInventarioComponent },
{ path: 'regVent', component: RegistrarVentaComponent },
{ path: 'vent', component: VentasListComponent },
{ path: 'prod', component: ProductoComponent },
{ path: 'detalle/:id', component: DetalleComponent },
{ path: 'notAuth', component: NotAuthComponent },
{ path: 'all-inv', component: AllInventariosComponent },
{path: 'devoluciones', component:RegistrarDevolucionComponent},
{path: 'consecutivo', component:ConsecutivoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
