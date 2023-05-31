import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type user={
  username:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  readonly api="http://localhost:3000/usuario"

  constructor(private http: HttpClient) { 
  }

  signin(credentials:user):Observable<any>{
    return this.http.post<any>(this.api + "/auth/signin", credentials);
  }
}
