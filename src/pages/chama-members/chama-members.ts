import { UserDataProvider } from './../../providers/user-data/user-data';
import { ChamaProvider } from './../../providers/chama/chama';
import { Member } from './../../models/ChamaMember';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
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
              private  altCtrl:AlertController,
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
            console.log("Removing  member  "+user.id +"From chama id"+this.chamaDetails.id);
            this.confirmUserRemoval(user);
            
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
      dismissOnPageChange:true,      
    });
  loader.present().then(()=>{
    this.chama_provider.getChamaMembers(this.chamaDetails.id).subscribe((members) =>{  
      loader.dismiss()    
      console.log(members);
      if(members.length ===0){
        this.userDataProvider.showToast("This Chama Has No Active Members");
        return;
      }
      this.chamaMembers = members;
    },error =>{
      loader.dismiss()
      console.log(`An error Has occured: ${error}`);
      this.userDataProvider.showToast(`Try again Later An error Has occured: ${error}`)
    });


  }).catch(error =>{
      console.log(`An error has Occured ${error}`);
    })  
  }
  removeMember(user:Member){
    let loader = this.loadingCtrl.create({
      content:'Removing '+ user.name + ' please wait',
      dismissOnPageChange:true
    });
    loader.present().then(()=>{
      this.chama_provider.removeMember(this.chamaDetails.id,user.id).subscribe(res =>{
        loader.dismiss();
        console.log(res)
        if(res.status =="success"){
          // after removing refresh content
          this.get_all_members();
          this.userDataProvider.showToast(`${user.name} Has Been removed Successfully`);
        }else{
          this.userDataProvider.showToast('Please Try Again Later')
        }
        
      },error  =>{
        loader.dismiss();
        console.log(`An error  has  occured ${error}`);
        this.userDataProvider.showToast(`Please Try again later`);
      })
    });
    
  }
  confirmUserRemoval(user:Member){
    let alert = this.altCtrl.create({
      title:'User Removal',
      message:'Are You Sure You Want to Remove User',
      buttons:[
        {
          text:'Cancle',
          role:'cancle',
          handler:()=>{
            console.log('cancleling')
          }
        },
        {
          text:'Yes',
          role:'okay',
          handler:()=>{
            console.log('confirmed  yes');
            this.removeMember(user);
          }
        }
      ]
    });
    alert.present();
    
  }
  

}
