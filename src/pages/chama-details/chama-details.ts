import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chama-details',
  templateUrl: 'chama-details.html',
})
export class ChamaDetailsPage {
  chamaname:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaname = this.navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaDetailsPage'+this.chamaname);
  }

}
