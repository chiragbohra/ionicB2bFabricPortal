import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerUpdatesPage } from './customer-updates';

@NgModule({
  declarations: [
    CustomerUpdatesPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerUpdatesPage),
  ],
})
export class CustomerUpdatesPageModule {}
