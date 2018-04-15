import { ChamaInterface } from './../../models/Chama';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { TransactionInterface } from './../../models/AccountTransactions';
import { ChamaProvider } from './../../providers/chama/chama';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chama-reports',
  templateUrl: 'chama-reports.html',
})
export class ChamaReportsPage {
  chamaDetails:ChamaInterface;
  transactions :any[];
  hasTransaction:Boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public chamaProvider:ChamaProvider,
              public userDataProvider:UserDataProvider,
              public loadingCtrl:LoadingController) {
    this.chamaDetails = this.navParams.data;

    this.loadTransactions()
    
  }

  ionViewDidLoad() {    
     
  }
  loadTransactions(){
    let loading = this.loadingCtrl.create({
      content:'Loading Transactions Please Wait',      
    });
    loading.present();    
    this.chamaProvider.getTransactions(this.chamaDetails.id).subscribe(data =>{
      loading.dismiss()
      if(data.data.length ===0){
        this.hasTransaction = false;
        this.userDataProvider.showToast("This Account Has No Transactions Yet")
        console.log("No Transactions")
        return;
      }
      this.hasTransaction = true;
      this.transactions = data.data;
      console.log(JSON.stringify(this.transactions))        
      
    },error =>{
      loading.dismiss()
      console.log("error occured"+error);
      this.userDataProvider.showToast(`Try Again Later An error has Occured::${error}`)
    })
  }

}
