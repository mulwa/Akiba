import { ChamaInterface } from './../../models/Chama';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-chama-loan-request',
  templateUrl: 'chama-loan-request.html',
})
export class ChamaLoanRequestPage {
  chamaDetails:ChamaInterface;
  loanForm:FormGroup;  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private form_builder:FormBuilder) {
    this.chamaDetails  = this.navParams.data;
    
    this.initializeForm();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaLoanRequestPage');
  }
  initializeForm(){
    this.loanForm =  this.form_builder.group({
      amount:['',Validators.required]
    })
  }
  requestLoan(){
    console.log("requesting loan  form"+this.chamaDetails.account_name);
  }

}
