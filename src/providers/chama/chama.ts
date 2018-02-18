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
   return this.http.post(BASEURL+"chama",body,this.options).map(res => res.json());
  }
  
  searchChama(chamaName:string){
    let body = "chama=" + chamaName;
    return this.http.post(BASEURL+"chama/search",body,this.options).map(res =>res.json());

  }
  sendRequest(accountId:number){
    let body = "acc_id="+ accountId;
    return this.http.post(BASEURL+"sendRequest",body,this.options).map(res => res.json());
  }
  

}
