import { SavingAccountPage } from './../pages/saving-account/saving-account';
import { FixedAccountPage } from './../pages/fixed-account/fixed-account';
import { ChamaPage } from './../pages/chama/chama';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage  } from '../pages/login/login';
import { AccoutTransactionsPage }  from '../pages/accout-transactions/accout-transactions';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
// import { DatePicker } from 'ionic2-date-picker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AccoutTransactionsPage,
    ChamaPage,
    FixedAccountPage,
    SavingAccountPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AccoutTransactionsPage,
    ChamaPage,   
    FixedAccountPage,
    SavingAccountPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
