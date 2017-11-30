import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FixedAccountProvider {
  private BaseUrl = "http://ku-elearning.com/akiba/public/api/";
  private headers;
  private options;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('content-type','application/x-www-form-urlencoded; charset=UTF-8');
    this.headers.append('accept', 'application/json');    
    this.options = new RequestOptions({headers:this.headers});
  }
  setFixedAccount(amount:number,withdrawDate,token:string){
    let data = "amount=" + amount + "&withdraw_date="+ withdrawDate + "&token="+ token;
        
    return this.http.post(this.BaseUrl+"lockCash",data,this.options).map(res => res.json());    
  }

}
