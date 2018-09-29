import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { BASEURL } from '../../models/BaseUrl';


@Injectable()
export class TransferProvider {
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
  transferCash(details:any){
    return this.http.post(BASEURL+"transfers", this.options).map(res => res.json())
  }
}

