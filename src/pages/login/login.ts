import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import {User} from '../../models/User';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm:FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private form_builder:FormBuilder,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private authService:AuthProvider) { 
    this.initializeForm();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
     
  }
  initializeForm(){
    this.loginForm = this.form_builder.group({
      email:['',Validators.required],
      password: ['',Validators.required]
    });    
  }
  login(){
    console.log(this.loginForm.value);    
    // this.authService.authenticate(this.loginForm.value).subscribe(data =>{
    //   console.log("before :" +data.status);
    //   // let user = data[0].status;
    //   // console.log("form function"+user);
      
    // })   
    this.showLoading("Validating Credentials");
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

}
