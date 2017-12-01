import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-lengo-account',
  templateUrl: 'lengo-account.html',
})
export class LengoAccountPage {
  private accountBalance;
  private lengoForm:FormGroup;
  private user_token:string;

  constructor(public navCtrl: NavController, 
              private formBuilder:FormBuilder,
              private userDataProvider: UserDataProvider,
              private auth:AuthProvider,
              private toastCtlr:ToastController) {

  this.user_token = this.auth.getUserToken();
  console.log("tOKEN"+this.user_token);
  // initialize form here
  this.initializeForm();
}

ionViewCanEnter():boolean {
    if(this.auth.getUserToken() ==null){
      return false;
    }
    return true;
  }

  ionViewDidLoad(){
    if(this.user_token !=null){
      this.userDataProvider.getAccountBalance(this.user_token).subscribe(data =>{
        this.accountBalance = data.account_amount;
        console.log(data);

        console.log("Current Balance"+this.accountBalance);

      },error =>{
        console.log("an error has occured"+error);
      })
    }else{
      this.navCtrl.setRoot(LoginPage);
      this.showToast("Please Login First");
    }
    
  }
  initializeForm(){
    this.lengoForm = this.formBuilder.group({
      target:['',Validators.required],
      amount:['',Validators.required],
      period:['',Validators.required]

    });
  }
  setLengo(){
    console.log(this.lengoForm.value);
    if(this.validateAmount(this.lengoForm.value.amount)){
      
    }else{
      this.showToast("You dont have enough money to complete this Transaction, Current balance is"+this.accountBalance);
    }
  }
  showToast(msg:string){
    let toast = this.toastCtlr.create({
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
