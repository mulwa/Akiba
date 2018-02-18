import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BASEURL} from '../../models/BaseUrl';


@Injectable()
export class ChamaProvider {  
  private headers;
  private options;
  private user_token;

  constructor(public http: Http,private authService: AuthProvider) {
    this.user_token = this.authService.getUserToken();
    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization':'Bearer'+this.user_token 
    });
        
    this.options = new RequestOptions({headers:this.headers});  
    console.log(this.headers); 
        
  }
  createChama(account_name){    
    
    let body = "account_name=" + account_name + "&token="+ this.user_token;
    console.log(body);
   return this.http.post(BASEURL+"chama",body,this.options).map(res => res.json());
  }
  

}
