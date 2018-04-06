import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembershipRequestPage } from './membership-request';

@NgModule({
  declarations: [
    MembershipRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(MembershipRequestPage),
  ],
})
export class MembershipRequestPageModule {}
