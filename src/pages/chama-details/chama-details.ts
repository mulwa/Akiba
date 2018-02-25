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
      { name:"Request Loan", icon : "loan.png", page: "ChamaLoanRequestPage" },
      { name: "Deposit", icon : "deposit.png", page: "ChamaDepositPage"},
      { name: "Members" , icon : "members.png", page:"ChamaMembersPage"},
      { name: "Reports", icon : "reports.png", page: "ChamaReportsPage"}
    ]
  }

  ionViewDidLoad() {
    
  }
  openPage(page:string){    
    this.navCtrl.push(page);
  }

}
