import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-chama',
  templateUrl: 'chama.html',
})
export class ChamaPage {
  private mychamas:any[];
  private chama:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chama = "accounts"; 

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

}
