import { LoginPage } from './../login/login';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-fixed-amount',
  templateUrl: 'fixed-amount.html',
})
export class FixedAmountPage {
  private accountBalance;
  private user_token;
  private fixedForm:FormGroup;

  constructor(public navCtrl: NavController,
              private auth:AuthProvider,
              private userDataService:UserDataProvider,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController) {
    this.user_token = this.auth.getUserToken();
    this.initializeForm();
  }

  ionViewCanEnter():boolean {
    if(this.auth.getUserToken() ==null){
      return false;
    }
    return true;
  }

  ionViewDidLoad() {
    if(this.user_token !=null){
      this.userDataService.getAccountBalance(this.user_token).subscribe(data =>{
        this.accountBalance =data.account_amount;
        console.log(data);
      })

    }else{      
      this.userDataService.showToast("Please Login first");
      this.navCtrl.setRoot(LoginPage);
    }
    
  } //end ionViewDidLoad
  
  initializeForm(){
    this.fixedForm = this.formBuilder.group({
      amount:['',Validators.required],
      duration:['',Validators.required],
      untilDate:['',Validators.required]
    });
  }
  save(){
    if(this.userDataService.validateAmount(this.fixedForm.value.amount,this.accountBalance)){

    }else{
      this.userDataService.showToast("You dont have enough money to complete this Transaction, Current balance is "+this.accountBalance);
    }
    console.log(this.fixedForm.value);
  }
  
 

}
