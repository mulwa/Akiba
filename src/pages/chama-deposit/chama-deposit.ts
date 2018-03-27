import { ChamaInterface } from './../../models/Chama';
import { ChamaProvider } from './../../providers/chama/chama';
import { AuthProvider } from './../../providers/auth/auth';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-chama-deposit',
  templateUrl: 'chama-deposit.html',
})
export class ChamaDepositPage {
  chamaDetails:ChamaInterface;
  depositForm:FormGroup;
  accountBalance;
  user_token;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private chama_provider:ChamaProvider,
              public userDataProvider:UserDataProvider,
              public authProvider: AuthProvider,
              private loadingCtrl: LoadingController,
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
    if(this.userDataProvider.validateAmount(this.depositForm.value.amount,this.accountBalance)){
      console.log('Depositing to a chama account',this.depositForm.value.amount);
      let loader = this.loadingCtrl.create({
        content:'Please Wait Depositing Cash',
        duration:1000
      });
      loader.present().then(()=>{
        this.chama_provider.depositToChama(this.depositForm.value.amount,this.chamaDetails.id).subscribe(res =>{
          if(res.status ==="success"){
            this.userDataProvider.showToast("Deposit Was Successfull");
          }else{
            this.userDataProvider.showToast(res.message);
          }
        },error =>{
          this.userDataProvider.showToast(`An error has Occured Please Try Later ${error}`);
        });
      }).catch(error =>{
        console.log(`An error has occurred please Try again later: ${error}`);
      })


    }else{
      this.userDataProvider.showToast("You dont have enough money to complete this Transaction, Current balance is "+this.accountBalance);
    }
  }
  

}
