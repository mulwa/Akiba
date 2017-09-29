import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the SavingAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saving-account',
  templateUrl: 'saving-account.html',
})
export class SavingAccountPage {

  constructor(public navCtrl: NavController,
   public navParams: NavParams,private datepicker:DatePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingAccountPage');
  }
  showDatePicker(){
    console.log("dateicker activated");
    this.datepicker.show({
      date:new Date(),
      mode: 'date',
      androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log("selected date :"+date);
      },
      error => {
        console.log("An errror occoured :"+error);
      }
    );
  }

}
