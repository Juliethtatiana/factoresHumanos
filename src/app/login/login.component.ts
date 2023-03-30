import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  speech:any
  constructor(private router: Router) {   
    localStorage.clear() 
    this.speech= new SpeechSynthesisUtterance();
  }
    main(){
        this.router.navigate(['/inv']);
    }

   disableanimations(){
    
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
