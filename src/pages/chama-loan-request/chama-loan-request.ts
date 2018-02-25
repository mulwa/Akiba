import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chama-loan-request',
  templateUrl: 'chama-loan-request.html',
})
export class ChamaLoanRequestPage {
  chamaDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaDetails  = this.navParams.data;
    console.log("loan  reques+ page "+this.chamaDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaLoanRequestPage');
  }

}
