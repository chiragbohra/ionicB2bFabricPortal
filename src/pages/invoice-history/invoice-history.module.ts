import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceHistoryPage } from './invoice-history';

@NgModule({
  declarations: [
    InvoiceHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceHistoryPage),
  ],
})
export class InvoiceHistoryPageModule {}
