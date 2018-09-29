import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadContactsPage } from './load-contacts';

@NgModule({
  declarations: [
    LoadContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadContactsPage),
  ],
})
export class LoadContactsPageModule {}
