import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChamaLoanRequestPage } from './chama-loan-request';

@NgModule({
  declarations: [
    ChamaLoanRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ChamaLoanRequestPage),
  ],
})
export class ChamaLoanRequestPageModule {}
