import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthProvider {
  isLoggedin:boolean;
  authToken:any;
  private url:string ="http://ku-elearning.com/akiba/public/api/login";

  constructor(public http: Http) {
    this.authToken = null;
    this.isLoggedin = false;
        
  }
  authenticate(user){
    // const 

  }
  

}
