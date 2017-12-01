import { LoginPage } from './../login/login';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController} from 'ionic-angular';
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
      this.showToast("Please Login First");
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
    if(this.validateAmount(this.savingForm.value.amount)){
      
    }else{
      this.showToast("You dont have enough money to complete this Transaction, Current balance is"+this.accountBalance);
    }
    
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 5000,
      position : 'bottom'
    });
    toast.present();
  }
  validateAmount(userAmount):boolean{
     return userAmount <= Math.round(this.accountBalance); 
  }

}
