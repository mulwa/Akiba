import { ChamaInterface } from './../../models/Chama';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-membership-request',
  templateUrl: 'membership-request.html',
})
export class MembershipRequestPage {
  chamaDetails:ChamaInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipRequestPage');
  }

}
