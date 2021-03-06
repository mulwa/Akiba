import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { FixedAmountPage } from './../fixed-amount/fixed-amount';
import { LengoAccountPage } from './../lengo-account/lengo-account';
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
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private authProvider: AuthProvider) {
    this.accountType=[
      { name:"Fixed Account",icon:"fixed_acc.png"},
      { name:'Savings Account', icon:'savings_acc.png'},
      { name: 'Fixed Amount Savings', icon:'fixed_acc.png'},
      { name: 'Chama Account',icon:'chama_acc.png'},
      { name: 'Lengo Account',icon:'lengo_acc.png'}
    ];
    
  }

  ionViewDidLoad() {
    if(this.authProvider.getUserToken() ==null){
      this.navCtrl.setRoot(LoginPage);
    }  
   
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
        case "Lengo Account":{
          this.navCtrl.push(LengoAccountPage);
          break;
        }
      case "Fixed Amount Savings":{
        this.navCtrl.push(FixedAmountPage);
        break;
      }
        default:{
          console.log("invalid selection");
        }

        }
      }
}
    

