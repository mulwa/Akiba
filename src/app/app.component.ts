import { AccoutTransactionsPage } from './../pages/accout-transactions/accout-transactions';
import { LoginPage } from './../pages/login/login';
import { TransferPage } from './../pages/transfer/transfer';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AccoutTransactionsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public authProvider:AuthProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Transaction',component: AccoutTransactionsPage },
      { title: 'Transfer Cash',component:TransferPage},
      { title: 'Open Account', component: HomePage },      
      { title: 'List', component: ListPage },
      { title:  'Logout', component: null}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {    
    if(page.component){
      this.nav.setRoot(page.component);
    }else{
      // clear storage
      console.log("clearing user data");
      this.authProvider.destroyUser();
      this.nav.setRoot(LoginPage);
    }
  }
}
