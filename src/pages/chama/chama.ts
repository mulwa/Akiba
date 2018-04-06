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
  private mychamas:ChamaInterface[];
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
    this.get_my_chama(); 
    if(this.user_token !== null){
      this.userDataService.getCurrentBalance(this.user_token).subscribe(data =>{       
        console.log(data);
      });
    }   
    
  }   
 
  getChama(event:any){
    // reset all chamas
    this.get_my_chama();
    let val =event.target.value;
    // make sure that the user types something
    if(val && val.trim() != ''){
      this.mychamas = this.mychamas.filter((item)=>{
        return (item.account_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
              this.userDataService.showToast(" Chama Name Can't be Empty Please provide One");             
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
  
  savaChama(name){
    let loader=this.loadingCtrl.create({
      content:"Creating New Chama",      
    });
    loader.present();
      this.chamaService.createChama(name).subscribe(data =>{
        loader.dismiss();
        if(data.status == 'success'){
          this.userDataService.showToast(data.message);
        }else{
          this.userDataService.showToast(`Try again later Please`);
        }
      },error =>{
        loader.dismiss();
        console.log("error occured"+error);
        this.userDataService.showToast("please Try again Later");
      });
   
    
  }
  showMore(chama:ChamaInterface){    
    this.navCtrl.push(ChamaDetailsPage,chama);
  }

  joinRequest(chama:ChamaInterface){
    let loader = this.loadingCtrl.create({
      content:"sending join request",
    });
    loader.present();    
    this.chamaService.sendRequest(chama.id).subscribe(data =>{
      loader.dismiss();
      if(data.status ==="success"){
        this.userDataService.showToast("Chama Request Send to the owner of "+chama.account_name);
      }else{
        this.userDataService.showToast("Please Try Again Later");
      }
    },error =>{
      loader.dismiss();
      this.userDataService.showToast(`Please Try Again Later : ${error}`);      
    })
  }

  get_my_chama(){
    console.log("executing get my chama");
    let loader = this.loadingCtrl.create({
      content: "Fetching Your Chama",     
    });
    loader.present();    
      this.chamaService.getAllchamas().subscribe((data) =>{ 
        loader.dismiss();       
      if(data.data.length === 0){
        this.userDataService.showToast("You Dont Have Any Active Chama");
        return;       
      }
       this.mychamas = data.data;
      
    }, error =>{
      this.userDataService.showToast(`Please try againa later ${error}`);
    });
    
    
    
  }

}
