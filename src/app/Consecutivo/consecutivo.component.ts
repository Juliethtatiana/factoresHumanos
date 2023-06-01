import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ConsecutivoService} from 'src/app/services/consecutivo.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-consecutivo',
  templateUrl: './consecutivo.component.html',
  styleUrls: ['./consecutivo.component.css']
})

export class ConsecutivoComponent implements OnInit {

  
  invProdForm:FormGroup
 
  userData:any
  authenticated:boolean
  user:any

  constructor(
    private consecutivoService: ConsecutivoService,
    private formBuilder:FormBuilder){
      this.authenticated=false;
      this.invProdForm = this.formBuilder.group({
        rango_min: 0,
        rango_max: 0,
     });
     
    }
    
  ngOnInit(): void {
    const userData=window.localStorage.getItem("UserData");
    
    if(userData){
      this.authenticated=true
      this.userData= window.localStorage.getItem('UserData')
     
    }
  }

  onSubmit():void{
    const consec={
      rango_min:Number(this.invProdForm.value.rango_min),
      rango_max:Number(this.invProdForm.value.rango_max),
      numero_actual:0
    }

    this.consecutivoService.new(consec).subscribe((response)=>{ 
      if (response.statusCode === 200) {
        Swal.fire('Listo', response.message, 'success');
      }else{
        Swal.fire('Error', 'Tenemos problemas para crear el producto', 'error');
      }
    })    
  }

}
