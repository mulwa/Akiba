import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedAmountPage } from './fixed-amount';

@NgModule({
  declarations: [
    FixedAmountPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedAmountPage),
  ],
})
export class FixedAmountPageModule {}
