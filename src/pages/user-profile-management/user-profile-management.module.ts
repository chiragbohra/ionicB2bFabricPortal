import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileManagementPage } from './user-profile-management';

@NgModule({
  declarations: [
    UserProfileManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfileManagementPage),
  ],
})
export class UserProfileManagementPageModule {}
