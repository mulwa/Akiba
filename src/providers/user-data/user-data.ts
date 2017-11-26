import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserDataProvider {
  private BaseUrl = "http://ku-elearning.com/akiba/public/api/accountBalance";

  constructor(public http: Http) {
    
  }
  getCurrentBalance(token:string){
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');
    headers.append('accept', 'application/json'); 
    let options = new RequestOptions({headers:headers});

    return this.http.get(this.BaseUrl+"/?"+token,options).map(res =>res.json());
    
  }

}
