import { SavingsProvider } from './../../providers/savings/savings';
import { LoginPage } from './../login/login';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
// import { DatePicker } from '@ionic-native/date-picker';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'


@IonicPage()
@Component({
  selector: 'page-saving-account',
  templateUrl: 'saving-account.html',
})
export class SavingAccountPage {
  private accountBalance;
  private savingForm:FormGroup;
  private user_token:string;
  

  constructor(public navCtrl: NavController,
              private auth:AuthProvider,
              private userDataProvider: UserDataProvider,
              private toastCtrl:ToastController,
              private savings_provider: SavingsProvider,
              private loadingCtrl: LoadingController,
              private formBuilder:FormBuilder) {
  // get current user
  this.user_token = this.auth.getUserToken();
  // initializeform
  this.initializeform();
}
  ionViewCanEnter():boolean {
      if(this.auth.getUserToken() ==null){
        return false;
      }
      return true;
    }

  ionViewDidLoad() {
    if(this.user_token !=null){
      this.userDataProvider.getAccountBalance(this.user_token).subscribe(data =>{
        console.log(data);
        this.accountBalance = data.account_amount;
        console.log("form saving"+this.accountBalance);
      });

    }else{
      this.userDataProvider.showToast("Please Login First");
      this.navCtrl.setRoot(LoginPage);
    }
  }
  initializeform(){
    this.savingForm = this.formBuilder.group({
      amount : ['',Validators.required],
      percentage: ['',Validators.required],
      duration: ['',Validators.required],
      wdate:  ['',Validators.required],
      token:  [this.user_token]

    });
  }
  save(){
    console.log(this.savingForm.value);
    if(this.userDataProvider.validateAmount(this.savingForm.value.amount,this.accountBalance)){

      let loader = this.loadingCtrl.create({
        content:'Please Wait Saving Cash',
        duration:1000
      });
      loader.present().then(() =>{
        this.savings_provider.makeSavings(this.savingForm.value).subscribe(res =>{
          if(res.status === "success"){
            this.userDataProvider.showToast("Successfully  Saved To your Account");
          }else{
            this.userDataProvider.showToast("Please Try  Again  Later");
          }

        }, err =>{
          this.userDataProvider.showToast(`An error  has occurred:${err}`);
          console.log(`an error has occured : ${err}`);
        })

      }).catch(e =>{
        console.log(`An error Has Occurred ${e}`);
      })


      
    }else{
      this.userDataProvider.showToast("You dont have enough money to complete this Transaction, Current balance is "+this.accountBalance);
    }
    
  }
   

}
