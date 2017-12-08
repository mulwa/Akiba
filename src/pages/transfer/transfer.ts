import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,ToastController  } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {

  constructor(public navCtrl: NavController,
              private contacts: Contacts,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferPage');
  }
  private loadContact(){
    console.log("load contacts");
     this.contacts.find(['displayName','phoneNumbers'], {filter: "", multiple: true}).then(contacts =>{
      console.log(contacts);
      this.showToast(JSON.stringify(contacts[0]));
      
    });
    let alert = this.alertCtrl.create({
      title:"Contacts",
      message:"Select Receiver Number",
      inputs : [
        {
          type: 'radio',
          label: 'christopher',
          value:'0707200317'
        },
        {
          type: 'radio',
          label: 'christopher mulwa',
          value:'0707200317'
        },
        {
          type: 'radio',
          label: 'Abu',
          value:'0707200317'
        }   
      ],
      buttons : [
        {
          text:"Cancle",
          handler: data =>{
            console.log("cancel clicked");
          }
        },
        {
          text: "Select",
          handler: data =>{
            this.showToast(data);
          }
        }
      ]
      
    });
    alert.present();
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 500000,
      position : 'bottom'
    });
    toast.present();
  }

}
