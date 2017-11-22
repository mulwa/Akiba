import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthProvider {
  isLoggedin:boolean;
  authToken:any; 
  currentMail:string; 
  private url:string ="http://ku-elearning.com/akiba/public/api/login";

  constructor(public http: Http, private storage:Storage) {
    this.authToken = null;
    this.isLoggedin = false;
        
  }

  authenticate(user){
    const body = "email=" + user.email + "&password="+ user.password;
    // let body = JSON.stringify(user);
    console.log(body);
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');
    headers.append('accept', 'application/json'); 
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.url,body,options)
      .map(res =>res.json());
  }

  storeUserCredential(email:string,token:string){   
    this.storage.set('email',email);
    this.storage.set('user_token',token);
  }
  getCurrentEmail(){
    return this.storage.get('email').then((val) =>{
      this.currentMail = val;     
    });   
  }
  getUserToken(){
    return this.storage.get('user_token').then((val)=>{
      this.authToken = val;    
    });
  }
  destroyUser(){
    this.storage.clear().then((res)=>{
      console.log("when user clicks logOUt"+res);
    });    
  }
  checkLoginStatus(){
    if(this.authToken != null){
      this.isLoggedin = true;
    }else{
      this.isLoggedin = false;
    }
  } 
  

}
