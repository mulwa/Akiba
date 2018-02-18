import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BASEURL} from '../../models/BaseUrl';


@Injectable()
export class AuthProvider {
  isLoggedin:boolean;
  authToken:any;  
  currentMail:string; 
  

  constructor(public http: Http, private storage:Storage) {
    this.authToken = null;
    this.isLoggedin = false;
        
  }

  authenticate(user){
    const body = "email=" + user.email + "&password="+ user.password;   
    
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');
    headers.append('accept', 'application/json'); 
    let options = new RequestOptions({headers:headers});

    return this.http.post(BASEURL+"login",body,options)
      .map(res =>res.json());
  }
  

  storeUserCredential(email:string,token:string){   
    window.localStorage.setItem('user_token',token);    
    window.localStorage.setItem('email',email);
    
  }
 
  getCurrentEmail():string{
  return window.localStorage.getItem('email');
  }
  getUserToken(){
    return window.localStorage.getItem('user_token');
  }
  destroyUser(){
      window.localStorage.removeItem('user_token');
      window.localStorage.removeItem('email');
  }
  checkLoginStatus(){
    if(this.authToken != null){
      this.isLoggedin = true;
    }else{
      this.isLoggedin = false;
    }
  } 
  

}
