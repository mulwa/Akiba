import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private signUpForm:FormGroup;

  constructor(public navCtrl: NavController, private form_builder:FormBuilder) {
    this.signUpForm  =  this.form_builder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone: ['',Validators.required],
      password:['',Validators.required],
      password2:['',Validators.required]

    });
  }
  signUp(){
    console.log(this.signUpForm.value);    
  }
  createAccount(){
    this.navCtrl.push(LoginPage);
  }


}
