import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChamaProvider {
  private BaseUrl = "http://ku-elearning.com/akiba/public/api/";
  private headers;
  private options;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('content-type','application/x-www-form-urlencoded; charset=UTF-8');
    this.headers.append('accept', 'application/json');    
    this.options = new RequestOptions({headers:this.headers});    
  }
  createChama(account_name,token){
    let body = "accout_name="+account_name+ "&token=" +token;
   return this.http.post(this.BaseUrl+"chama",body,this.options).map(res => res.json());
  }

}
