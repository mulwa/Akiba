import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChamaPage } from './chama';

@NgModule({
  declarations: [
    ChamaPage,
  ],
  imports: [
    IonicPageModule.forChild(ChamaPage),
  ],
})
export class ChamaPageModule {}
