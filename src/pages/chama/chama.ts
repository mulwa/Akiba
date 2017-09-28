import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChamaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chama',
  templateUrl: 'chama.html',
})
export class ChamaPage {
  private mychamas;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mychamas = ['Account1','Account2','Account3','Account4','Account5','Account6'];
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaPage');
  }

}
