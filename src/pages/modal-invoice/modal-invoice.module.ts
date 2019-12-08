import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalInvoicePage } from './modal-invoice';

@NgModule({
  declarations: [
    ModalInvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalInvoicePage),
  ],
})
export class ModalInvoicePageModule {}
