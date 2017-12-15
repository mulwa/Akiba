import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class UserDataProvider {
  private BaseUrl = "http://ku-elearning.com/akiba/public/api/";
  private headers;
  private options;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('content-type','application/x-www-form-urlencoded; charset=UTF-8');
    this.headers.append('accept', 'application/json');    
    this.options = new RequestOptions({headers:this.headers});
    
  }
  getCurrentBalance(token:string){
    return this.http.get(this.BaseUrl+"balances"+"?token="+token).map(res =>res.json());    
  }
  getUserData(token:string){
    return this.http.get(this.BaseUrl+"user"+"?token="+token).map(res =>res.json());
  }
  getAccountBalance(token:string){
    return this.http.get(this.BaseUrl+"accountBalance"+"?token="+token).map(res=>res.json());
  }
  getFixedAccount(token:string){
     return this.http.get(this.BaseUrl+"balances"+"?token="+token).map(res => res.json());
  }

}
