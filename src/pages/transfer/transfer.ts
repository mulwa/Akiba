import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,ToastController,AlertOptions  } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {
  private allContacts:any;

  constructor(public navCtrl: NavController,
              private contacts: Contacts,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferPage');
  }
  private loadContact(){ 
    var options:AlertOptions = {
      title :  "Contacts",
      message: 'Select Receipient',
      buttons: [
        {
          text : 'Cancel',
          role : 'cancel',
          handler : ()=> {
            console.log("cancel");
          }
        },
        {
          text : 'Ok',
          handler: data=>{
            console.log(data)
            this.showToast(data);
          }
        }
      ]
    };    
      
     this.contacts.find(['displayName','phoneNumbers'], {filter: "", multiple: true}).then(contacts =>{
       this.allContacts = contacts;
       let alert = this.alertCtrl.create(options);
        for(let item of contacts){
          alert.addInput({
            type: 'radio',
            label: JSON.stringify(item.displayName),
            value: JSON.stringify(item.phoneNumbers[0].value)
          })
        }
      alert.present();           
    });
    
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 5000,
      position : 'bottom'
    });
    toast.present();
  }

}
