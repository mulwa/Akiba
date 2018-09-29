import { LoadContactsPage } from './../load-contacts/load-contacts';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController,AlertController,ToastController,AlertOptions,LoadingController, ModalController  } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage { 
  public contactSelected:any;

  constructor(public navCtrl: NavController,
              private contacts: Contacts,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController,
              private storage : Storage,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
  }
  private loadContact(){
    console.log('Loading numbers called')
    // open modal with contact details
    let contact_modal = this.modalCtrl.create(LoadContactsPage);
    contact_modal.onDidDismiss((contact:any)=>{
      console.log('returned :' + contact);
      this.contactSelected = contact;
    });
    contact_modal.present();    
  }
  saveContact(){
    console.log('saving contacts called')
        
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 10000,
      position : 'bottom'
    });
    toast.present();
  }

}
