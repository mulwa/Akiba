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
  private loadingCtrl:LoadingController,private alertCtrl:AlertController) {
    this.signUpForm  =  this.form_builder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone: ['',Validators.required],
      password:['',Validators.required],
      password2:['',Validators.required]

    });
  }
  signUp(){
    // console.log(this.signUpForm.value); 
    const loading = this.loadingCtrl.create({
      content:'Please wait creating Account',
      duration:5000
    });  
    loading.onDidDismiss(()=>{
      this.showAlert();
    })
    loading.present();

  }
  showAlert(){
    const alert = this.alertCtrl.create({
      title:"Welcome",
      subTitle:"Your Account Has Been Created Sucessfully",
      buttons:['Ok']
    });
    alert.present();
    
  }
  createAccount(){
    this.navCtrl.push(LoginPage);
  }
  


}
