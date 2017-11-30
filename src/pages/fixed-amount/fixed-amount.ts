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

  ionViewDidLoad() {
    if(this.user_token !=null){
      this.userDataService.getAccountBalance(this.user_token).subscribe(data =>{
        this.accountBalance =data.account_amount;
        console.log(data);
      })

    }else{
      console.log("please log in first");
      this.showToast("Please Login first");
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
    if(this.validateAmount(this.fixedForm.value.amount)){

    }else{
      this.showToast("You dont have enough money to complete this Transaction ");
    }
    console.log(this.fixedForm.value);
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 3000,
      position : 'bottom'
    });
    toast.present();
  }
  validateAmount(userAmount):boolean{
    if(userAmount > this.accountBalance){
      return false;
    }
    return true;
  }

}
