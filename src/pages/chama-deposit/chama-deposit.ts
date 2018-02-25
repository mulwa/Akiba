import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-chama-deposit',
  templateUrl: 'chama-deposit.html',
})
export class ChamaDepositPage {
  chamaDetails:any;
  depositForm:FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private form_builder:FormBuilder) {
    this.chamaDetails =  navParams.data;
    this.initializeForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaDepositPage');
  }
  initializeForm(){
    this.depositForm = this.form_builder.group({
      amount: ['',Validators.required],
    })
  }
  chamaDeposit(){
    console.log("depositing  amount");
  }

}
