import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chama-members',
  templateUrl: 'chama-members.html',
})
export class ChamaMembersPage {
  chamaDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaMembersPage');
  }

}
