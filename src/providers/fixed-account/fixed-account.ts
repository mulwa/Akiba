import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BASEURL} from '../../models/BaseUrl';


@Injectable()
export class FixedAccountProvider {   
  private headers;
  private options;
  private user_token;

  constructor(public http: Http,
              private authService:AuthProvider) {
    this.user_token = authService.getUserToken();
    
    this.headers = new Headers({
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'application/json',
      'Authorization':'Bearer'+this.user_token
    });
      
    this.options = new RequestOptions({headers:this.headers});
  }
  setFixedAccount(formdata:any){
    // let data = "amount=" + amount + "&withdraw_date="+ withdrawDate + "&token="+ token;
    let data = JSON.stringify(formdata);
    console.log("from lock service"+data);        
    return this.http.post(BASEURL+"lockCash",data,this.options).map(res => res.json());    
  }  

}
