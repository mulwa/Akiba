import { SavingAccountPage } from './../saving-account/saving-account';
import { FixedAccountPage } from './../fixed-account/fixed-account';
import { ChamaPage } from './../chama/chama';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-accout-transactions',
  templateUrl: 'accout-transactions.html',
})
export class AccoutTransactionsPage {
  private accountType;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.accountType=['Fixed Account','Savings Account','Fixed Amount Saving','Chama Account'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccoutTransactionsPage');
  }
  openTransaction(item){
    this.navigateAccount(item);
  }
  navigateAccount(type:string){
    switch(type){
      case "Fixed Account":{
        this.navCtrl.push(FixedAccountPage);
        break;
      }
        case "Savings Account":{
          this.navCtrl.push(SavingAccountPage);
          break;
        }
        case "Fixed Amount Saving":{
          console.log('fixed account');
          break;
        }
        case "Chama Account":{          
          this.navCtrl.push(ChamaPage);
          break;
        }
        default:{
          console.log("invalid selection");
        }

        }
      }
}
    

