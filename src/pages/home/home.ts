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
    // console.log(this.signUpForm.value); 
    // const loading = this.loadingCtrl.create({
    //   content:'Please wait creating Account',
    //   duration:5000
    // });  
    // loading.onDidDismiss(()=>{
    //   this.showAlert();
    // })
    // loading.present();
    this.userProvider.createUser(this.signUpForm.value).then(res =>{
      if(res){
        this.showAlert("Welcome","Successfully Created Account")
      }else{
        this.showAlert("Error","An Error Has occured Please Try  Later");
      }
    })

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
