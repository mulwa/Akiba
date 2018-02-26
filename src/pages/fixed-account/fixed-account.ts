import { FixedAccountProvider } from './../../providers/fixed-account/fixed-account';
import { LoginPage } from './../login/login';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController,Nav,LoadingController,AlertController,ToastController  } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import 'rxjs/add/operator/filter';
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
  private currentAccountAmount:any;
  private alreadyTransacted:boolean;
  private transactionMsg:string;

  constructor(public navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private authService:AuthProvider,              
              private userDataService:UserDataProvider,             
              private form_builder:FormBuilder,
              private nav: Nav,
              private toastCtrl:ToastController,
              private fixedService: FixedAccountProvider) {

      // collect currently logged in user data
      this.user_token = this.authService.getUserToken();
      this.user = this.authService.getCurrentEmail();
      console.log(this.user_token+""+this.user);
      // initialize form
      this.initializeform();
      // check existing  transactions
      this.alreadyTransacted = false;
            
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
       this.userDataService.getCurrentBalance(this.user_token).subscribe(res => {
          this.currentAccountAmount = res.find(data => data.account == "fixedAmount");
          // check if there active transaction
           this.checkExistingTransaction();         
       });
       this.userDataService.getCurrentBalance(this.user_token).subscribe(res => {
          console.log(res);       
       });

      this.userDataService.getUserData(this.user_token).subscribe((data)=>{
        // console.log(data);
      }); 
      this.userDataService.getAccountBalance(this.user_token).subscribe((data)=>{
        console.log(data);
        
        this.accountBalance = data.account_amount;
        // for testing service
        // this.accountBalance = 6000;
        console.log(this.accountBalance);
      })
    }else{
      this.userDataService.showToast("Please Login first");     
    }    
    
  }

  initializeform(){
    this.fixedAccountForm = this.form_builder.group({
      amount :['',Validators.required],
      withdraw_date :['',Validators.required],
      token :[this.user_token] 
    });

  }
  selectFixedAccount(account){
    return account.name === 'fixedAmount';
  }
   fixedaccount(data) { 
    return data.account === 'fixedAmount';
}  

  lockAccount(){
       
    if(this.validateAmount(this.fixedAccountForm.value.amount)){
      let loader = this.loadingCtrl.create({
        content:"Locking Account please Wait",
        duration:10000
      });
      loader.present().then(()=>{
        this.fixedService.setFixedAccount(this.fixedAccountForm.value).subscribe(data =>{
          if(data.status == "success"){
            this.transactionMsg = data.message;
          }else{
            this.transactionMsg = data.message;
          }
          console.log(data);
        },error => {
          console.log("error has occured"+error);
          this.transactionMsg = "Please try again later"; 
          loader.dismissAll();
          this.showAlert("Transaction Status",this.transactionMsg);         
          
        },()=>{
          loader.dismissAll();
          this.showAlert("Transaction Status",this.transactionMsg);
        })

      });
     

    }else{
      this.userDataService.showToast("You dont have enough money to complete this Transaction, Your current Balance is " + this.accountBalance);
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
  
  // disable button to wait current balance to load
  ActualBalaceLoaded(){    
    if(this.accountBalance !==null){
      this.isenabled = true;
    }else{
      this.isenabled = false;
    }
  }
  checkExistingTransaction(){
    if(this.currentAccountAmount.amount !=0 || this.currentAccountAmount == null){
      this.alreadyTransacted = true;
      this.userDataService.showToast("you aleady have fixed transaction");
    }else{
      this.alreadyTransacted = false;
      this.userDataService.showToast("you can transaction");
    }
  }

}
