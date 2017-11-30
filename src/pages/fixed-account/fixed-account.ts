import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,AlertController,ToastController  } from 'ionic-angular';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-fixed-account',
  templateUrl: 'fixed-account.html',
})
export class FixedAccountPage { 
  private user_token:string;
  private user:string;
  private date;
  private accountBalance;
  private fixedAccountForm:FormGroup;

  constructor(public navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private authService:AuthProvider,              
              private userDataService:UserDataProvider,
              private datePicker:DatePicker,
              private form_builder:FormBuilder,
              private toastCtrl:ToastController) {

      // collect currently logged in user data
      this.user_token = this.authService.getUserToken();
      this.user = this.authService.getCurrentEmail();
      console.log(this.user_token+""+this.user);
      // initialize form
      this.initializeform();
            
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
        
        this.accountBalance = data.account_amount;
        console.log(this.accountBalance);
      })
    }else{
      this.showToast("Please Login first");
    }
    
  }
  initializeform(){
    this.fixedAccountForm = this.form_builder.group({
      amount:['',Validators.required],
      withdrawDate:['',Validators.required]
    });

  }
  openDatePicker(){
    console.log("opening date picker");
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme:this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then((date)=>{
      this.date = date;
      console.log("date"+date);

    },error =>{
      console.log("error"+error);
    });
    
  }

  lockAccount(){
    this.showLoading("Saving Fixed Account");
    console.log(this.fixedAccountForm.value)
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
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
