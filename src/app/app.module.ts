import { ChamaDetailsPage } from './../pages/chama-details/chama-details';
import { TransferPage } from './../pages/transfer/transfer';
import { LengoAccountPage } from './../pages/lengo-account/lengo-account';
import { FixedAmountPage } from './../pages/fixed-amount/fixed-amount';
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
import { DatePicker } from '@ionic-native/date-picker';
import { Network } from '@ionic-native/network';
import { AuthProvider } from '../providers/auth/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { IonicStorageModule,Storage} from '@ionic/storage';
import { UserDataProvider } from '../providers/user-data/user-data';
import { RegistrationProvider } from '../providers/registration/registration';
import { FixedAccountProvider } from '../providers/fixed-account/fixed-account';
import { ChamaProvider } from '../providers/chama/chama';
import { Contacts} from '@ionic-native/contacts';
import { LoadContactsPage } from '../pages/load-contacts/load-contacts';
import { TransferProvider } from '../providers/transfer/transfer';



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
    FixedAmountPage,
    LengoAccountPage,
    TransferPage,
    ChamaDetailsPage,
    LoadContactsPage    

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
    FixedAmountPage,
    LengoAccountPage,
    TransferPage,
    ChamaDetailsPage,
    LoadContactsPage        
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    Contacts,
    Network,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,   
    UserServiceProvider,
    UserDataProvider,
    RegistrationProvider,
    FixedAccountProvider,
    ChamaProvider
     
    
  ]
})
export class AppModule {}
