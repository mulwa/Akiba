import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BASEURL} from '../../models/BaseUrl';


@Injectable()
export class RegistrationProvider {  

  constructor(public http: Http) {
    

  }
  regiserUser(user){
    //  const body = JSON.stringify(user);
     const body = "email=" + user.email + "&name=" + user.name + "&phone_number=" + user.phone_number + "&password="+ user.password;  
    
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');
    headers.append('accept', 'application/json'); 
    let options = new RequestOptions({headers:headers});

    return this.http.post(BASEURL+"register",body,options).map(res => res.json());
  }

}
