import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "src/app/services/login.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  speech:any
  userForm:FormGroup
  
  constructor(private router: Router,
    private loginService:LoginService,
    private formBuilder:FormBuilder) {   
    localStorage.clear() 
    this.speech= new SpeechSynthesisUtterance();
    this.userForm = this.formBuilder.group({
      username:"",
      password:""
    });
  }
    main(){
      
      const usr={
        username:this.userForm.value.username,
        password:this.userForm.value.password
      }
      console.log(usr)
        this.loginService.signin(usr).subscribe((response)=>{
          if(response.statusCode === 200){
            window.localStorage.setItem("UserData", JSON.stringify(response.user))
            this.speak("logueo exitoso");
            this.router.navigate(['/inv']);
          }
        },(error: HttpErrorResponse) => {
          if (error.status === 400) {
            Swal.fire('Error', error.error.message, 'error');
            this.speak("error, "+error.error.message);
          } else {
            // Handle other errors
            Swal.fire('Error', error.message, 'error');
            this.speak("error, "+error.error.message);
          }
        })
       
    }




   speak(msg:string){
    
    if(localStorage.getItem("speech")=="true"){
      this.speech.text=msg
      speechSynthesis.speak(this.speech);
    }
  
   }

  start() {
   localStorage.setItem("speech","true")
   
   this.speech.text='Bienvenido a la accesibilidad por voz del sistema stockify '
   this.speech.rate=1;
   this.speech.pitch=1
   speechSynthesis.speak(this.speech);

  }
 

  
}
