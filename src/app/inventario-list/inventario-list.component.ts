import { Component, OnInit } from '@angular/core';
import {InventarioService} from 'src/app/services/inventario.service'

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnInit {
  inventarioInfo:any
  listaProductos:any
  listaDevoluciones:any
  authenticated:boolean
  user:any
  administrator:boolean 
  speech:any


  constructor(private inventarioService: InventarioService){
    this.authenticated=false
    this.administrator=false
    this.speech= new SpeechSynthesisUtterance();
  }
  ngOnInit() {

    //se revisa si el usuario ya se registro
    const userData=window.localStorage.getItem("UserData");
    if(userData){
      this.authenticated=true
      this.user=JSON.parse(userData)
    
      if(this.user.role=="ADMIN"){
        this.administrator=true
        this.inventarioService.getInventory(1).subscribe((response)=>{
          console.log(response)
          this.inventarioInfo=response;
        })
        this.inventarioService.getProducts(1).subscribe((response)=>{
          console.log(response)
          this.listaProductos=response;
        })
        this.inventarioService.getProducts(2).subscribe((response)=>{
          console.log(response)
          this.listaDevoluciones=response;
        })
      }else{

        this.inventarioService.getInventorybyUser(Number(this.user.idusuario)).subscribe((response)=>{
          console.log(response)
          this.inventarioInfo=response;
          window.localStorage.setItem("idInventario",this.inventarioInfo.idinventario)
          this.inventarioService.getProducts(Number(this.inventarioInfo.idinventario)).subscribe((response)=>{
            console.log(response)
            this.listaProductos=response;
          })
        })
        

      }
    }else{

    }
   
  }
  
  speak(msg:string){
    
    if(localStorage.getItem("speech")=="true"){
      this.speech.text=msg
      speechSynthesis.speak(this.speech);
    }
  
   }
}
