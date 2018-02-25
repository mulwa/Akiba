import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChamaMembersPage } from './chama-members';

@NgModule({
  declarations: [
    ChamaMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChamaMembersPage),
  ],
})
export class ChamaMembersPageModule {}
