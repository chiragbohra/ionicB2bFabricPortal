import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalButtonsPage } from './modal-buttons';

@NgModule({
  declarations: [
    ModalButtonsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalButtonsPage),
  ],
})
export class ModalButtonsPageModule {}
