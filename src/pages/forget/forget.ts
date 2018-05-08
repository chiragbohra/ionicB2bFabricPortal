import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forget",
  templateUrl: "forget.html"
})
export class ForgetPage {
  userid: any;
  email: any;
  formSubmit: any;
  viewData: any;
  emailFailed: boolean = false; //initially set to false //using if user enters wrong data or correct data

  constructor(
    public navCtrl: NavController,
    public sentRequest: ServicesProvider,
    public navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.sentRequest.toGetUsernameEmail().then(getorderdata => {
      // getorderdata it is variable
      this.viewData = getorderdata;
      //  console.log(JSON.stringify(getorderdata));
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgetPage");
  }

  Request() {
    for (var i = 0; i < this.viewData.length; i++) {
      if (
        this.viewData[i].UserId == this.userid &&
        this.viewData[i].EMailAdd == this.email
      ) {
        console.log("email sent");
        this.presentToast("success");
        this.emailFailed = false;
        return; //return used to break condition
      } else {
        this.emailFailed = true;
      }
    }
    if ((this.emailFailed = true)) {
      this.presentToast("invalid");
      console.log("email not sent");
    }
  }
  presentToast(action: any) {
    if (action == "invalid") {
      let toast = this.toastCtrl.create({
        message: "Sorry the requested record doesn't exists",
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
        message: "email sent",
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
