import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginForm:FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private form_builder:FormBuilder) { 
    this.initializeForm();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
     
  }
  initializeForm(){
    this.loginForm = this.form_builder.group({
      email:['',Validators.required],
      password: ['',Validators.required]
    });    
  }
  login(){
    console.log(this.loginForm.value);
  }

}
