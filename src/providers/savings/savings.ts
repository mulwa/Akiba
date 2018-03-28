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
      
  }

  // makeSavings(saveData){
  //   let body = "amount=" + saveData.amount + "&percentage=" + saveData.percentage + "&duration=" + saveData.duration + "&wdate="+ saveData.wdate + "&token="+ saveData.token;   
  //   console.log(body);
  //   return this.http.post(BASEURL+"save",body,this.options).map(res => res.json());
  // }
  // longoSavings(lengoData){
  //   let body = "target=" + lengoData.target + "&contr_amount=" + lengoData.contr_amount + "&deductioperiod=" +lengoData.deductioperiod;

  //   console.log(body);
  //   return this.http.post(BASEURL+"lengo",body,this.options).map(res => res.json());
  // }  

}



// target=1000&contr_amount=100&deductioperiod=7
// target=1000&contr_amount=50&deductioperiod=7


// amount=100&percentage=10&duration=7&wdate=2018-12-10&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6Ly9ha2liYWZyaWNhLnRlY2gvYXBpL2xvZ2luIiwiaWF0IjoxNTIyMTM3NjUxLCJleHAiOjE1MjIyODE2NTEsIm5iZiI6MTUyMjEzNzY1MSwianRpIjoibzhMU1gzM21oNm5Nb0NmdCJ9.CNTLUgCXWeGVFlj6XSP31jCtNEw2igsn_vluDEEulaU

// amount=10&percentage=10&duration=7&wdate=2018-12-10&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6Ly9ha2liYWZyaWNhLnRlY2gvYXBpL2xvZ2luIiwiaWF0IjoxNTIyMTU4NTc5LCJleHAiOjE1MjIzMDI1NzksIm5iZiI6MTUyMjE1ODU3OSwianRpIjoiMGZYd0kydkVHaHRNMHhjayJ9.SPnlnkhyNoscJRGaK-zb_WBYUZPeWVmHC6g_e862E8k
