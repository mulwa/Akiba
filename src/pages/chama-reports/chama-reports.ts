import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chama-reports',
  templateUrl: 'chama-reports.html',
})
export class ChamaReportsPage {
  chamaDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chamaDetails = this.navParams.data;
  }

  ionViewDidLoad() {  
  }

}
