import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-saving-account',
  templateUrl: 'saving-account.html',
})
export class SavingAccountPage {

  constructor(public navCtrl: NavController,
   public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingAccountPage');
  }
  showDatePicker(){
    console.log("dateicker activated");
    
  }

}
