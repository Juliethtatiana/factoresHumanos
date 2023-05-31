import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  admin:boolean
  
  constructor(){
    this.admin=false
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
}
