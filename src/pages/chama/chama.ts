import { ChamaDetailsPage } from './../chama-details/chama-details';
import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,ToastController} from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-chama',
  templateUrl: 'chama.html',
})
export class ChamaPage {
  private mychamas:any[];
  private chama:string; 

  constructor(public navCtrl: NavController,
               private alertCtrl: AlertController,
               private toastCtrl:ToastController) {
    this.chama = "myaccounts";   

    this.initializeChamas();   
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaPage');
  }
  initializeChamas(){
    this.mychamas = [
      { name:"Open Republic",members:"51"},
      { name:"Gdg Juja", members:"100"},
      { name:"Young Proffessionals", members:"30"},
      { name:"Akiba Bora",members:"20" }
    ]

  }
  getChama(event:any){
    // reset all chamas
    this.initializeChamas();
    let val =event.target.value;
    // make sure that the user types something
    if(val && val.trim() != ''){
      this.mychamas = this.mychamas.filter((item)=>{
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }        
  }
  addChama(){
    this.showPrompt();
  }
  showPrompt(){
    let alert = this.alertCtrl.create({
      title:'Creat New Chama',
      inputs :[
        {
          name:'name',
          placeholder:'Chama Name'
        }
      ],
      buttons : [
        {
          text:'Cancel',
          role: 'cancel',
          handler:data =>{
            console.log("cancle clicked");
          }
        },
        {
          text: 'Save',
          handler: data =>{
            if(data.name ==''){ 
              this.showToast(" Chama Name Can't be Empty Please provide One");             
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  showToast(msg:string){
    let toast = this.toastCtrl.create({
      message : msg,
      duration : 5000,
      position : 'bottom'
    });
    toast.present();
  }
  showMore(chama){
    console.log("navigating to"+chama.name);
    this.navCtrl.push(ChamaDetailsPage,chama);
  }
  joinRequest(chama){
    this.showToast("Chama Request Send to the owner of" + chama.name);
  }

}
