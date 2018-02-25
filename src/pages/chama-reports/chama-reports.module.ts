import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChamaReportsPage } from './chama-reports';

@NgModule({
  declarations: [
    ChamaReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChamaReportsPage),
  ],
})
export class ChamaReportsPageModule {}
