import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedAccountPage } from './fixed-account';

@NgModule({
  declarations: [
    FixedAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedAccountPage),
  ],
})
export class FixedAccountPageModule {}
