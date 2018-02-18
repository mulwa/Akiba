import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController,AlertController,ToastController,AlertOptions,LoadingController  } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage { 
  private CONTACT_KEY = 'contacts';
  private loading:any;
  private contactFound = [];
  private contactLoading:any;

  constructor(public navCtrl: NavController,
              private contacts: Contacts,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private storage : Storage,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
  }
  private loadContact(){
    this.contactLoading = this.loadingCtrl.create({
      content:"Fetching Contacts"    
    });
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
    this.contactLoading.present().then(()=>{
      this.storage.get(this.CONTACT_KEY).then((data)=>{
      this.contactLoading.dismissAll();
      this.contactFound = JSON.parse(data);
      this.showToast(""+this.contactFound[0].Contacts['_objectInstance'].hasOwnProperty('displayName'));            
      if(data == null){
        this.showToast("Please Load Your Contacts");        
      }
      let alert = this.alertCtrl.create(options);      
      // for (let item of this.contactFound){       
      //   this.showToast(item);
      //   // item.phoneNumbers[0].value
      // }
      alert.present();  
         
    }).catch(e =>{
      this.showToast("An Erorr as occured"+e);
      this.contactLoading.dismissAll();
    });  

    });
               
  
    
  }
  saveContact(){
    this.loading =  this.loadingCtrl.create({
      content : "Refreshing Contacts"
    });
    this.loading.present().then(()=>{
      this.contacts.find(['displayName','phoneNumbers'], {filter: "", multiple: true}).then(contacts =>{ 
        this.storage.set(this.CONTACT_KEY,JSON.stringify(contacts)).then(value =>{
          
          this.showToast(" Contacts Refreshed");
          this.loading.dismissAll();
        }).catch(e =>{
          this.showToast("Error has Occured"+e);
          this.loading.dismissAll();
        });                
    }).catch(e =>{
      this.showToast("An Error has occured when saving your contacts");
      this.loading.dismissAll();
    
    });
    });    
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
