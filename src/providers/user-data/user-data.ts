import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserDataProvider {
  private BaseUrl = "http://ku-elearning.com/akiba/public/api/credit";

  constructor(public http: Http) {
    
  }
  getCurrentBalance(token:string){
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('accept', 'application/json');    
    let options = new RequestOptions({headers:headers});

    return this.http.get(this.BaseUrl+"?token="+token).map(res =>res.json());    
  }

}
