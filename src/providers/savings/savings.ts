import { BASEURL } from './../../models/BaseUrl';
import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class SavingsProvider {
  private headers;
  private options;
  private user_token;

  constructor(public http: Http,
              private authProvider:AuthProvider) {
  this.user_token = this.authProvider.getUserToken();
    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization':'Bearer'+this.user_token 
    });
        
    this.options = new RequestOptions({headers:this.headers});  
    console.log(this.headers);    
  }

  makeSavings(saveData){
    let body = JSON.stringify(saveData);
    console.log('duration only'+saveData.duration);
    console.log(JSON.stringify(body));
    return this.http.post(BASEURL+"save",body,this.options).map(res => res.json());
  }
  longoSavings(lengoData){
    let body = JSON.stringify(lengoData);
    return this.http.post(BASEURL+"lengo",body,this.options).map(res => res.json());
  }

}
