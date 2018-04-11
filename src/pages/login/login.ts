import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
//import { DashboardPage } from "../dashboard/dashboard";

import { ForgetPage } from "../forget/forget";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  DashboardPage() {
    this.navCtrl.setRoot("DashboardPage");
  }
  navigateToForgetPage(): void {
    this.navCtrl.push("ForgetPage");
  }
}
