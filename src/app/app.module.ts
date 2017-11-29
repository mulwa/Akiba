import { SavingAccountPage } from './../pages/saving-account/saving-account';
import { FixedAccountPage } from './../pages/fixed-account/fixed-account';
import { ChamaPage } from './../pages/chama/chama';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage  } from '../pages/login/login';
import { AccoutTransactionsPage }  from '../pages/accout-transactions/accout-transactions';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { DatePicker } from '@ionic-native/date-picker';
// import { DatePicker } from 'ionic2-date-picker';
import { DatePicker } from 'ionic2-date-picker';
import { AuthProvider } from '../providers/auth/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule,Storage} from '@ionic/storage';
import { UserDataProvider } from '../providers/user-data/user-data';
import { RegistrationProvider } from '../providers/registration/registration';
import { FixedAccountProvider } from '../providers/fixed-account/fixed-account';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AccoutTransactionsPage,
    ChamaPage,
    FixedAccountPage,
    SavingAccountPage,
    DatePicker

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
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
    SavingAccountPage,
    DatePicker
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,   
    UserServiceProvider,
    UserDataProvider,
    RegistrationProvider,
    FixedAccountProvider,
    
  ]
})
export class AppModule {}
