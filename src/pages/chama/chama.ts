import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-chama',
  templateUrl: 'chama.html',
})
export class ChamaPage {
  private mychamas:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mychamas = [
      { name:"Open Republic",members:"51"},
      { name:"Gdg Juja", members:"100"},
      { name:"Young Proffessionals", members:"30"},
      { name:"Akiba Bora",members:"20" }
    ]
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamaPage');
  }

}
