import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavingAccountPage } from './saving-account';

@NgModule({
  declarations: [
    SavingAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(SavingAccountPage),
  ],
})
export class SavingAccountPageModule {}
