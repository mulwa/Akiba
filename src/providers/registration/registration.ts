import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RegistrationProvider {
  private baseUrl:string = "http://ku-elearning.com/akiba/public/api/register";

  constructor(public http: Http) {

  }
  regiserUser(user){
    //  const body = JSON.stringify(user);
     const body = "email=" + user.email + "&name=" + user.name + "&phone_number=" + user.phone_number + "&password="+ user.password;  
     console.log(body);
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');
    headers.append('accept', 'application/json'); 
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.baseUrl,body,options).map(res => res.json());
  }

}
