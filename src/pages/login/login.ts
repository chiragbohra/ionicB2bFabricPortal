import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
//import { DashboardPage } from "../dashboard/dashboard";
import { ServicesProvider } from "../../providers/services/services";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  userId: any;
  password: any;
  formSubmit: any;
  viewData: any;
  loginFailed: boolean = false;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentRequest: ServicesProvider,
    private toastCtrl: ToastController
  ) {
    this.sentRequest.toGetUsernamePassword().then(getorderdata => {
      // getorderdata it is variable
      this.viewData = getorderdata;
      //  console.log(JSON.stringify(getorderdata));
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  login() {
    for (var i = 0; i < this.viewData.length; i++) {
      if (
        this.viewData[i].UserId == this.userId &&
        this.viewData[i].PassWord == this.password
      ) {
        this.navCtrl.setRoot("UserProfileManagementPage", this.userId);
        this.presentToast("success");
        localStorage.setItem("userId", this.userId);
        this.loginFailed = false;
      } 
      // else if (this.viewData[i].UserName != this.username) {
      //   this.presentToast("invalidUsername");
      // } else if (this.viewData[i].UserName != this.username) {
      //   this.presentToast("invalidPassword");
      // }
    }
    //commented login part by using passportjs
    // let review = {
    //   // review array
    //   useranme: this.username,
    //   password: this.password
    // };
    // console.log(review);
    // this.sentRequest.createReview(review); //review is array
  }

  navigateToForgetPage(): void {
    this.navCtrl.push("ForgetPage");
  }

  presentToast(action: any) {
    if (action == "invalid") {
      let toast = this.toastCtrl.create({
        message: " Incorrect Username",
        duration: 3000,
        position: "bottom"
      });

      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });

      toast.present();
    }
    if (action == "success") {
      let toast = this.toastCtrl.create({
        message: "Login Successfull",
        duration: 3000,
        position: "bottom"
      });

      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });

      toast.present();
    }
  }
}
