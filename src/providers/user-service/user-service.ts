import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserServiceProvider {
  private BASIC_URL:string = "http://ku-elearning.com/akiba/public/api/register";
  private response_message:string;

  constructor(public http: Http) {
    console.log('Hello UserServiceProvider Provider');
  }
  createUser(user:User){
    let data = "name=" + user.name + "&email="+ user.email + "&password="+ user.password + "&phone_number=" + user.phone_number;
    let body = JSON.stringify(user);
    console.log(data);
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');
    let options = new RequestOptions({headers:headers});
    return new Promise(resolve =>{
      this.http.post(this.BASIC_URL,data,options).subscribe((data) =>{
        console.log(data.json());
        this.response_message = data.json().status;
        if(data.json().status ==="success"){
          resolve(true);
        }else{
          resolve(false);
        }
      });

    });

    
        
  }

}

