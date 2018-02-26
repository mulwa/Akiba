import { Member } from './../../models/ChamaMember';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chama-members',
  templateUrl: 'chama-members.html',
})
export class ChamaMembersPage {
  chamaDetails:any;
  chamaMembers:Array<Member>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private actionSheet:ActionSheetController) {
    this.chamaDetails = this.navParams.data;

    this.chamaMembers = [
      {id:42, name:"Mulwa Christopher",email:"mulwatech@gmail.com",phone_number:"0707200314", contribution:500},
      {id:2, name:"John Mathew",email:"tech@gmail.com",phone_number:"0707200314", contribution:500},
      {id:12, name:"Kate Marshal",email:"kate@gmail.com",phone_number:"0707200314", contribution:200},
      {id:52, name:"Kimani George",email:"kimani@gmail.com",phone_number:"0707200314", contribution:300},
      {id:12, name:"Mulwa Erick",email:"mulwatech@gmail.com",phone_number:"0707200314", contribution:100},
      {id:4, name:"Maina Martin",email:"mulwatech@gmail.com",phone_number:"0707200314", contribution:250},

    ]
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

}
