import { RegistrationProvider } from './../../providers/registration/registration';
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
  private message:string;

  constructor(public navCtrl: NavController, private form_builder:FormBuilder,
  private loadingCtrl:LoadingController,private alertCtrl:AlertController,private regProvider:RegistrationProvider) {
    
    this.signUpForm  =  this.form_builder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone_number: ['',Validators.required],
      password:['',Validators.required],
      password2:['',Validators.required]
 
    });
  }
  signUp(){ 
    let loader = this.loadingCtrl.create({
      content:"Registering Your Details",
      duration:10000
    });
    loader.present().then(()=>{
      this.regProvider.regiserUser(this.signUpForm.value).subscribe((data)=>{
        console.log(data);
        if(data.status=="success"){
          this.message="Thanks for Joining Our community"
        }else{
          this.message="Please try Again"
        }
      }, error =>{
        console.log("Error happend"+error);        
        this.message="Erro! Please Try again Later";
      },()=>{
        console.log("completed");
        loader.dismissAll();
        this.showAlert("Status",this.message);
      });
    });  

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
