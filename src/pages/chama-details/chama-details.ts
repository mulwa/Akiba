import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chama-details',
  templateUrl: 'chama-details.html',
})
export class ChamaDetailsPage {
  chamaname:string;
  chamaTransactions:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaname = this.navParams.get('name');
    this.chamaTransactions = [
      { name:"Request Loan"},
      { name: "Deposit"},
      { name: "Members"},
      { name: "Transactions"}
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaDetailsPage'+this.chamaname);
  }

}
