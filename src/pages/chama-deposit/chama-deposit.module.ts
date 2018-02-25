import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChamaDepositPage } from './chama-deposit';

@NgModule({
  declarations: [
    ChamaDepositPage,
  ],
  imports: [
    IonicPageModule.forChild(ChamaDepositPage),
  ],
})
export class ChamaDepositPageModule {}
