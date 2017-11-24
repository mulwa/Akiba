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

  constructor(public navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {

      this.today = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedAccountPage');
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
