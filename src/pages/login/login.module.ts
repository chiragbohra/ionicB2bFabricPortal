import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LoginPage } from "./login";
//import { DashboardPage } from "../dashboard/dashboard";

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage)]
})
export class LoginPageModule {}

