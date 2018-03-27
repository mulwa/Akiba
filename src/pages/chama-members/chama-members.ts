import { UserDataProvider } from './../../providers/user-data/user-data';
import { ChamaProvider } from './../../providers/chama/chama';
import { Member } from './../../models/ChamaMember';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { ChamaInterface } from "../../models/Chama";

@IonicPage()
@Component({
  selector: 'page-chama-members',
  templateUrl: 'chama-members.html',
})
export class ChamaMembersPage {
  chamaDetails:ChamaInterface;
  chamaMembers:any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private loadingCtrl:LoadingController,
              private userDataProvider: UserDataProvider,
              private chama_provider:ChamaProvider,
              private actionSheet:ActionSheetController) {
    this.chamaDetails = this.navParams.data;
    this.get_all_members();

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaMembersPage');
  }
  showActions(user:Member){
    let actSheet  = this.actionSheet.create({      
      buttons: [
         {
          text: "Call",
          icon: "call",
          role:"destructive",
          handler: () =>{
            console.log("call member");
          }         
        }, 
        {
          text:"Make administrator",
          role: "destructive",
          icon: "person",
          handler:()=>{
            console.log("make adminstrator");
          }
        },
        {
          text: "Remove Member",
          role:"destructive",
          icon: "trash",
          handler:()=>{
            console.log("Remove member")
          }
        },              
        {
          text: "Cancel",
          role: "cancel",
          icon: "close",
          handler: ()=>{
            console.log("Cancel cliked");
          }
        }
      ]
    });
    actSheet.present();    
  }

  get_all_members(){    
    let loader = this.loadingCtrl.create({
      content:'Fetching Chama Members',
      duration:1000
    });
  loader.present().then(()=>{
    this.chama_provider.getChamaMembers(this.chamaDetails.id).subscribe((members) =>{      
      console.log(members);
      if(members.length ===0){
        this.userDataProvider.showToast("This Chama Has No Active Members");
        return;
      }
      this.chamaMembers = members;
    },error =>{
      console.log(`An error Has occured: ${error}`);
    });


  }).catch(error =>{
      console.log(`An error has Occured ${error}`);
    })  
  }

}
