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
  username: any;
  email: any;
  formSubmit: any;
  viewData: any;
  loginFailed: boolean = false;

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
    {
      for (var i = 0; i < this.viewData.length; i++) {
        if (
          this.viewData[i].UserName == this.username &&
          this.viewData[i].EMailAdd == this.email
        ) {
          console.log("email sent");
          this.presentToast("success");

        }
      }
    }
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
