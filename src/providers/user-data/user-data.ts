import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import { ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { BASEURL} from '../../models/BaseUrl';

@Injectable()
export class UserDataProvider {  
  private headers;
  private options;

  constructor(public http: Http, public toastCtrl:ToastController) {
    this.headers = new Headers();
    this.headers.append('content-type','application/x-www-form-urlencoded; charset=UTF-8');
    this.headers.append('accept', 'application/json');    
    this.options = new RequestOptions({headers:this.headers});
    
  }
  getCurrentBalance(token:string){
    return this.http.get(BASEURL+"balances"+"?token="+token).map(res =>res.json());    
  }
  getUserData(token:string){
    return this.http.get(BASEURL+"user"+"?token="+token).map(res =>res.json());
  }
  getAccountBalance(token:string){
    return this.http.get(BASEURL+"accountBalance"+"?token="+token).map(res=>res.json());
  }
  getFixedAccount(token:string){
     return this.http.get(BASEURL+"balances"+"?token="+token).map(res => res.json());
  }
  validateAmount(userAmount:number,currentBalance:number):boolean{
    return userAmount <= Math.round(currentBalance);    
    
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 5000,
      position : 'bottom'
    });
    toast.present();
  }

}
