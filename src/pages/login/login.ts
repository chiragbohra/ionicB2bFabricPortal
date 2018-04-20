import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
//import { DashboardPage } from "../dashboard/dashboard";
import { ServicesProvider } from "../../providers/services/services";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  username: any;
  password: any;
  formSubmit: any;
  viewData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentRequest: ServicesProvider
  ) {
    this.toGetUsernamePasswordData(); //method call here to get data
  }

  logForm() {
    console.log(this.username);
    console.log(this.password);
  }

  DashboardPage() {
    this.navCtrl.setRoot("UserProfileManagementPage");

    let review = {
      // review array
      useranme: this.username,
      password: this.password
    };
    console.log(review);
    this.sentRequest.createReview(review); //review is array
  }

  navigateToForgetPage(): void {
    this.navCtrl.push("ForgetPage");
  }

  toGetUsernamePasswordData() {
    //method  to get data from server
    this.sentRequest.toGetUsernamePassword().then(getorderdata => {
      // getorderdata it is variable
      this.viewData = getorderdata;
      console.log(JSON.stringify(getorderdata));
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
}
