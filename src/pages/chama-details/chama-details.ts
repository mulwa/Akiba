import { ChamaInterface } from './../../models/Chama';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chama-details',
  templateUrl: 'chama-details.html',
})
export class ChamaDetailsPage {
  chama:ChamaInterface;
  chamaTransactions:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chama = this.navParams.data;  
    this.chamaTransactions = [
      { name:"Request Loan", icon : "loan.png", page: "ChamaLoanRequestPage" },
      { name: "Deposit", icon : "deposit.png", page: "ChamaDepositPage"},
      { name: "Members" , icon : "members.png", page:"ChamaMembersPage"},
      { name: "Reports", icon : "reports.png", page: "ChamaReportsPage"},
      { name: "Membership Request", icon : "members.png", page: "MembershipRequestPage"}
    ]
  }

  ionViewDidLoad() {
    
  }
  openPage(page:string){    
    this.navCtrl.push(page,this.chama);
    console.log(page)
  }

}
