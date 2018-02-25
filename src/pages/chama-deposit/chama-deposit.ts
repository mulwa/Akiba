import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chama-deposit',
  templateUrl: 'chama-deposit.html',
})
export class ChamaDepositPage {
  chamaDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaDetails =  navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaDepositPage');
  }

}
