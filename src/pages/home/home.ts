import { UserServiceProvider } from './../../providers/user-service/user-service';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';

import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private signUpForm:FormGroup;

  constructor(public navCtrl: NavController, private form_builder:FormBuilder,
  private loadingCtrl:LoadingController,private alertCtrl:AlertController,private userProvider:UserServiceProvider) {

    this.signUpForm  =  this.form_builder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone_number: ['',Validators.required],
      password:['',Validators.required],
      password2:['',Validators.required]

    });
  }
  signUp(){    
    
    this.showLoading("Creating Account");

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
  createAccount(){
    this.navCtrl.push(LoginPage);
  }
  


}
