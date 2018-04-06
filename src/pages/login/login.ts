import { AccoutTransactionsPage } from './../accout-transactions/accout-transactions';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import {User} from '../../models/User';
import { Network } from '@ionic-native/network';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm:FormGroup;
  private loginStatus:string;  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private form_builder:FormBuilder,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private authService:AuthProvider,
              private toastCtrl:ToastController,
              private network:Network) { 
    this.initializeForm();   
  }

  ionViewDidLoad() {
   this.network.onDisconnect().subscribe(()=>{
     this.showToast("You Dont have Connection");

   })
     
  }
  initializeForm(){
    this.loginForm = this.form_builder.group({
      email:['',Validators.required],
      password: ['',Validators.required]
    });    
  }
  login(){ 
    let loader = this.loadingCtrl.create({
      content: "Checking Credentials"      
    });
    loader.present().then(()=>{
      this.authService.authenticate(this.loginForm.value).subscribe(data =>{

      if(data.status == "success"){
       this.authService.storeUserCredential(data.user.email,data.token);
       this.loginStatus ="Welcome " + data.user.name+"";       
       this.navCtrl.setRoot(AccoutTransactionsPage);
       

      }else{
        console.log("not saving");
        this.loginStatus = "Wrong Email Password combination";
         
      }      
    },error =>{
      console.log(error);
      this.loginStatus = "Please Try again Later";
       
    },()=>{      
      loader.dismiss();
      this.showAlert("Login  Status",this.loginStatus);  
    });   
  });      
    
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
      message : msg,
      duration : 5000,
      position : 'bottom'
    });
    toast.present();
  }

  openAccount(){
    this.navCtrl.setRoot(HomePage);
    console.log("open Account called");
  }

}
