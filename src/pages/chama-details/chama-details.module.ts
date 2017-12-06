import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChamaDetailsPage } from './chama-details';

@NgModule({
  declarations: [
    ChamaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChamaDetailsPage),
  ],
})
export class ChamaDetailsPageModule {}
