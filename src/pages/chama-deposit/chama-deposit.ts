import { AuthProvider } from './../../providers/auth/auth';
import { UserDataProvider } from './../../providers/user-data/user-data';
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
  accountBalance;
  user_token;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userDataProvider:UserDataProvider,
              public authProvider: AuthProvider,
              private form_builder:FormBuilder) {
    this.chamaDetails =  navParams.data;
    this.initializeForm();

    this.user_token = this.authProvider.getUserToken();
  }

  ionViewDidLoad() {
    if(this.user_token != null){
      this.userDataProvider.getAccountBalance(this.user_token).subscribe(data =>{
        this.accountBalance = data.account_amount;
      });
    }
  }
  initializeForm(){
    this.depositForm = this.form_builder.group({
      amount: ['',Validators.required],
    })
  }
  chamaDeposit(){
    console.log("depositing  amount"+this.depositForm.value.amount);
    if(this.userDataProvider.validateAmount(this.depositForm.value.amount,this.accountBalance)){

    }else{
      this.userDataProvider.showToast("You dont have enough money to complete this Transaction, Current balance is "+this.accountBalance);
    }
  }

}
