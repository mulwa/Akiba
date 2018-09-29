import { ChamaProvider } from './../../providers/chama/chama';
import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
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
              private chama_provider: ChamaProvider,
              private loadingCtrl:LoadingController,              
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
      this.userDataProvider.showToast("Please Login First");
    }
    
  }
  initializeForm(){
    this.lengoForm = this.formBuilder.group({
      target:['',Validators.required],
      contr_amount:['',Validators.required],
      deductioperiod:['',Validators.required],      

    });
  }
  setLengo(){
    console.log(this.lengoForm.value);
    console.log('entered amount '+this.lengoForm.value.contr_amount);
    console.log('actual balance '+this.accountBalance);
    if(this.userDataProvider.validateAmount(this.lengoForm.value.contr_amount,this.accountBalance)){
      let loader = this.loadingCtrl.create({
        content:"Setting Your Lengo Amount",        
      });
      loader.present().then(()=>{
        loader.dismiss();
        this.chama_provider.longoSavings(this.lengoForm.value).subscribe((res)=>{
          if(res.status ==="success"){
            this.userDataProvider.showToast("Transaction was Successfull");
          }else{
            this.userDataProvider.showToast("Transaction failed:  Try again later");
          }

        },error =>{
          loader.dismiss()
          console.log(`An error has occurred please Try again later ${error}`);
          this.userDataProvider.showToast(`An error has occurred please Try again later ${error}`);
        
        })

      }).catch(error=>{
        console.log(`An error has Occured: ${error}`);
        this.userDataProvider.showToast(`An error has occured ${error}`)
      })
      
    }else{
      this.userDataProvider.showToast("You dont have enough money to complete this Transaction, Current balance is "+this.accountBalance);
    }
  }
  
  
}
