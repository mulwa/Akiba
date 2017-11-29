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
  private loginStatus:string;
  private loading:any;
  

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
    this.loading = this.loadingCtrl.create({
      content: "Checking Credentials",
      duration:10000
    });
    this.loading.present().then(()=>{
      this.authService.authenticate(this.loginForm.value).subscribe(data =>{     
      if(data.status == "success"){
       this.authService.storeUserCredential(data.user.email,data.token);
       this.loginStatus ="Welcome " + data.user.name+"";
       

      }else{
        console.log("not saving");
        this.loginStatus = "Wrong Email Password combination";
         
      }      
    },error =>{
      console.log(error);
      this.loginStatus = "Please Try again Later";
       
    },()=>{
      console.log("login completed"); 
      this.loading.dismissAll();
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

}
