import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  admin:boolean
  speech:any
  constructor(){
    this.admin=false,
    this.speech= new SpeechSynthesisUtterance();
  }
  ngOnInit() {
    const userData= window.localStorage.getItem("UserData")
    if(userData ){

      const user=JSON.parse(userData)
      if(user.role==="ADMIN"){
        this.admin=true
      }

    }
  }

  speak(msg:string){
    
    if(localStorage.getItem("speech")=="true"){
      this.speech.text=msg
      speechSynthesis.speak(this.speech);
    }
  
   }

 
}
