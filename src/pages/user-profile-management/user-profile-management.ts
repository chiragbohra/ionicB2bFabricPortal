import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
/**
 * Generated class for the UserProfileManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-profile-management",
  templateUrl: "user-profile-management.html"
})
export class UserProfileManagementPage {
  mycart;
  badge;
  name;
  email;
  phone;
  address1;
  address2;
  address3;
  city;
  pincode;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentRequest: ServicesProvider
  ) {
    console.log(localStorage.getItem("userId"));
    let userId = localStorage.getItem("userId");

    this.sentRequest.getUserInfo(userId).then(userInfo => {
      console.log(userInfo);
      try {
        this.name = userInfo[0].CustName;
        this.email = userInfo[0].CustEmail;
        this.phone = userInfo[0].CustPhone;
        this.address1 = userInfo[0].CustAdd1;
        this.address2 = userInfo[0].CustAdd2;
        this.address3 = userInfo[0].CustAdd3;
        this.city = userInfo[0].CustCity;
        this.pincode = userInfo[0].CustPinCd;
      } catch (e) {}
    });

    //using for calculating products in cart
    try {
      this.mycart = JSON.parse(localStorage.getItem("productDetails"));
      console.log(this.mycart.length);
      this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {}
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserProfileManagementPage");
  }

  update() {}
}
