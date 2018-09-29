import { BASEURL } from './../../models/BaseUrl';
import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers,Response,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';



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
    return this.http.get(BASEURL+"sendRequest/"+accountId,this.options).map(res => res.json());
  }  
  getAllchamas(){
    let search_params = new URLSearchParams();
    search_params.append("token",this.user_token);    
    return this.http.get(BASEURL+"chama/admin",new RequestOptions({headers:this.headers,search:search_params})).map(res =>res.json());
  }
  getChamaMembers(id:number){
    return this.http.get(BASEURL+"chama/"+id+"/users",this.options).map(res => res.json());
  }

  depositToChama(amount:number,accountId:number){
    let body = "amount="+ amount;
    return this.http.post(BASEURL+"chama/"+accountId+"/deposit",body,this.options).map(res => res.json());
  } 

  
  longoSavings(lengoData){
    let body = "target=" + lengoData.target + "&contr_amount=" + lengoData.contr_amount + "&deductioperiod=" +lengoData.deductioperiod;

    console.log(body);
    return this.http.post(BASEURL+"lengo",body,this.options).map(res => res.json());
  }
   makeSavings(saveData){
    let body = "amount=" + saveData.amount + "&percentage=" + saveData.percentage + "&duration=" + saveData.duration + "&wdate="+ saveData.wdate + "&token="+ saveData.token;   
    console.log(body);
    return this.http.post(BASEURL+"save",body,this.options).map(res => res.json());
  } 

  getTransactions(accountId:number){
    return this.http.get(BASEURL+"account/"+accountId+"/transactions").map(res =>res.json());
  }

  // removing member form  a  chama
  removeMember(accountId:number, userId:number){
    return  this.http.get(BASEURL+"chama/"+accountId+"/"+userId+"/destroy").map(res => res.json());
  }

  // method for transfer cash
  transferCash(details:any){
    return this.http.post(BASEURL+"transfers",details, this.options).map(res => res.json())
  }

}
