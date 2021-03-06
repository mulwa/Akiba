import { ContactInterface } from './../../models/contactI';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-load-contacts',
  templateUrl: 'load-contacts.html',
})
export class LoadContactsPage {  
  private contactFound = [];
  private contact_object:ContactInterface;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public contacts: Contacts,
              public storage: Storage,
              public userProvider:UserDataProvider,
              public loadingCtrl: LoadingController,
              public viewCtrl:ViewController) {

                this.loadContacts();
  }

  ionViewDidLoad() {
    
  }
  loadContacts(){
    let loader = this.loadingCtrl.create({
      content:'Please Wait Fetching Contacts'
    });
    loader.present().then(()=>{
      let options = {
		    filter : "",
		    multiple:true,
		    hasPhoneNumber:true	
		};
      this.contacts.find(['displayName', 'phoneNumbers'],options)
      .then(contacts =>{
        loader.dismiss()
        for(let item = 0; item < contacts.length; item++){
          if(contacts[item].phoneNumbers != null){
            this.contactFound = contacts;
            this.contact_object = {
              name:contacts[item].displayName,
              phoneNo:contacts[item].phoneNumbers[0].value
            }
            console.log(this.contact_object);
          }
        }
        
      }).catch((error =>{
        loader.dismiss()
        console.log('unable to fetch contacts'+error)
        this.userProvider.showToast('unable to fetch contacts '+error)
      }))
    })
       
  }
  selectNumber(number){
    this.viewCtrl.dismiss(number)
  }
  

}
