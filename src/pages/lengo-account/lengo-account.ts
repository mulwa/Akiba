import { AuthProvider } from './../../providers/auth/auth';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              private auth:AuthProvider) {

  this.user_token = this.auth.getUserToken();
  console.log("tOKEN"+this.user_token);
  // initialize form here
  this.initializeForm();
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
      console.log("continue"+this.lengoForm.value.amount );
    }else{
      console.log("failed you entered" +this.lengoForm.value.amount+ "Available"+this.accountBalance);
    }
  }
  validateAmount(userAmount):boolean{
    if(userAmount > this.accountBalance){
      return false;
    }
    return true;
  }
}
