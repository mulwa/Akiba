import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LengoAccountPage } from './lengo-account';

@NgModule({
  declarations: [
    LengoAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(LengoAccountPage),
  ],
})
export class LengoAccountPageModule {}
