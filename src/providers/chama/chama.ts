import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ChamaProvider {
  private BaseUrl = "http://ku-elearning.com/akiba/public/api/";
  private headers;
  private options;
  private user_token;

  constructor(public http: Http,private authService: AuthProvider) {
    this.user_token = this.authService.getUserToken();
    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization':'Baerer' + this.user_token
    });    
    this.options = new RequestOptions({headers:this.headers});  
    console.log(this.headers); 
        
  }
  createChama(account_name,token){
    
    let body = "accout_name="+account_name+ "&token=" +token;
   return this.http.post(this.BaseUrl+"chama",body,this.options).map(res => res.json());
  }
  

}
