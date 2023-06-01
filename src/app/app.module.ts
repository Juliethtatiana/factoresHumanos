import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarioListComponent } from './inventario-list/inventario-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrarInventarioComponent } from './registrar-inventario/registrar-inventario.component';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoComponent } from './producto/producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NavbarComponent } from './navbar/navbar.component';
import { NotAuthComponent } from './not-auth/not-auth.component';
import { AllInventariosComponent } from './all-inventarios/all-inventarios.component';
import { DetalleComponent } from './detalle/detalle.component';
import {RegistrarDevolucionComponent} from "./registrar-devolucion/registrar-devolucion.component"

@NgModule({
  declarations: [
    AppComponent,
    InventarioListComponent,
    LoginComponent,
    RegistrarInventarioComponent,
    RegistrarVentaComponent,
    VentasListComponent,
    ProductoComponent,
    NavbarComponent,
    AllInventariosComponent,
    DetalleComponent,
    NotAuthComponent,
    RegistrarDevolucionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
