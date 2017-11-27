import { UserDataProvider } from './../../providers/user-data/user-data';
import { Storage } from '@ionic/storage';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,AlertController } from 'ionic-angular';
import {FormGroup} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-fixed-account',
  templateUrl: 'fixed-account.html',
})
export class FixedAccountPage {
  today:any;
  private user_token:string;
  user:string;

  constructor(public navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private authService:AuthProvider,
              private storage:Storage,
              private userDataService:UserDataProvider) {

      this.today = new Date().toISOString();
      this.user_token = this.authService.getUserToken();
      this.user = this.authService.getCurrentEmail();
      console.log(this.user_token+""+this.user);
            
  }

  ionViewDidLoad() {
    if(this.user_token !=null){
       this.userDataService.getCurrentBalance(this.user_token).subscribe(data =>{
        console.log(data);
      }); 

    }
    
  }

  saveSubmit(){
    this.showLoading("Saving Fixed Account");
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
