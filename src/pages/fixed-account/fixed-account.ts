import { LoginPage } from './../login/login';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController,Nav,LoadingController,AlertController,ToastController  } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
// import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-fixed-account',
  templateUrl: 'fixed-account.html',
})
export class FixedAccountPage { 
  private user_token:string;
  private user:string;  
  private accountBalance;
  private fixedAccountForm:FormGroup; 
  private isenabled:boolean=false;

  constructor(public navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private authService:AuthProvider,              
              private userDataService:UserDataProvider,             
              private form_builder:FormBuilder,
              private nav: Nav,
              private toastCtrl:ToastController) {

      // collect currently logged in user data
      this.user_token = this.authService.getUserToken();
      this.user = this.authService.getCurrentEmail();
      console.log(this.user_token+""+this.user);
      // initialize form
      this.initializeform();
            
  }
  
  ionViewCanEnter():boolean {
    if(this.authService.getUserToken() ==null){
      return false;
    }else{
      return true;
    }    
  }

  ionViewDidLoad() {
    if(this.user_token !=null){
       this.userDataService.getCurrentBalance(this.user_token).subscribe(data =>{       
        console.log(data);
      });

      this.userDataService.getUserData(this.user_token).subscribe((data)=>{
        console.log(data)
      }); 
      this.userDataService.getAccountBalance(this.user_token).subscribe((data)=>{
        console.log(data);
        
        this.accountBalance = data.account_amount;
        console.log(this.accountBalance);
      })
    }else{
      this.showToast("Please Login first");
     
    }    
    
  }
  initializeform(){
    this.fixedAccountForm = this.form_builder.group({
      amount :['',Validators.required],
      withdraw_date :['',Validators.required],
      token :[this.user_token] 
    });

  }
  

  lockAccount(){      
    console.log(this.fixedAccountForm.value);
    console.log(this.validateAmount(this.fixedAccountForm.value.amount));
    
    if(this.validateAmount(this.fixedAccountForm.value.amount)){
      console.log("good to go");

    }else{
      this.showToast("You dont have enough money to complete this Transaction, Your current Balance is" + this.accountBalance);
    }
  }
  validateAmount(userAmount:number):boolean{
    return userAmount <= Math.round(this.accountBalance);    
    
  }

    
  showLoading(content:string){
    let loading = this.loadingCtrl.create({
      content:content,
      duration:3000,
    });
    loading.onDidDismiss(()=>{
      this.showAlert("Keep Calm","Server Not Up");
    });
    loading.present();
  }
  showAlert(title:string, msg:string){
    const alert = this.alertCtrl.create({
      title:title,
      subTitle:msg,
      buttons:['Ok']
    });
    alert.present();
    
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message:  msg,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
  // disable button to wait current balance to load
  ActualBalaceLoaded(){    
    if(this.accountBalance !==null){
      this.isenabled = true;
    }else{
      this.isenabled = false;
    }
  }

}
