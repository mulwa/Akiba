import { ChamaInterface } from './../../models/Chama';
import { ChamaDetailsPage } from './../chama-details/chama-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ChamaProvider } from "../../providers/chama/chama";
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AuthProvider } from './../../providers/auth/auth';



@IonicPage()
@Component({
  selector: 'page-chama',
  templateUrl: 'chama.html',
})
export class ChamaPage {
  private mychamas:any[];
  private chama:string; 
  private user_token:string;
  // private accountBalance:any;
  private user:string;
   mChama:ChamaInterface;


  constructor(public navCtrl: NavController,
               private alertCtrl: AlertController,
               private toastCtrl:ToastController,
               private chamaService : ChamaProvider,
               private authService: AuthProvider,
               private userDataService: UserDataProvider,
               private loadingCtrl : LoadingController) {
    this.chama = "myaccounts"; 
    this.initializeChamas(); 
    this.user_token = this.authService.getUserToken();
    this.user = this.authService.getCurrentEmail();
    console.log(this.user_token);
  }
  ionViewCanEnter():boolean {
    if(this.authService.getUserToken() ==null){
      return false;
    }else{
      return true;
    }    
  } 

  ionViewDidLoad() {
    if(this.user_token !== null){
      this.userDataService.getCurrentBalance(this.user_token).subscribe(data =>{       
        console.log(data);
      });
    }
    
  }
  initializeChamas(){
    this.mychamas = [
      { id:1, name:"Open Republic",members:"51"},
      { id:2, name:"Gdg Juja", members:"100"},
      { id:3, name:"Young Proffessionals", members:"30"},
      { id:4, name:"Akiba Bora",members:"20" }
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
      });
      this.chamaService.searchChama(val).filter(res => val).subscribe(data =>{
        this.mChama = data;
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
          name:'account_name',
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
            if(data.account_name ==''){ 
              this.showToast(" Chama Name Can't be Empty Please provide One");             
              return false;
            }
            this.savaChama(data.account_name);
            console.log(data.account_name);
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
  savaChama(name){
    let loader=this.loadingCtrl.create({
      content:"Creating New Chama",
      duration:1000
    });
    loader.present().then(() =>{
      this.chamaService.createChama(name).subscribe(data =>{
        console.log(data);
        if(data.status == 'success'){
          this.showToast(data.message);
        }
      },error =>{
        console.log("error occured"+error);
        this.showToast("please Try again Later");
      },()=>{
        console.log("complete called");
        loader.dismissAll();
      })

    });
    
  }
  showMore(chama){    
    this.navCtrl.push(ChamaDetailsPage,chama);
  }
  joinRequest(chama:ChamaInterface){
    this.showToast("Chama Request Send to the owner of" + chama.account_name);
    this.chamaService.sendRequest(chama.id).subscribe(data =>{
      console.log(data);
    })
  }

}
