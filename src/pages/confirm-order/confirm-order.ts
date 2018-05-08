import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { ServicesProvider } from "../../providers/services/services";
/**
 * Generated class for the ConfirmOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-confirm-order",
  templateUrl: "confirm-order.html"
})
export class ConfirmOrderPage {
  badge;
  mycart;
  SKUNo: any = [];
  Quantity: any = [];
  Price: any = [];
  status;
  code;
  total;
  conditionForm;
  conditionFormAddress;
  address;
  showButton: boolean = true;
  ordersPlaced: any;
  GrandTotal;
  afterDisc: any;
  text;
  text2;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private toastCtrl: ToastController
  ) {
    console.log(this.navParams.get("values")); //
    let values = this.navParams.get("values");
    try {
      this.GrandTotal = values.GrandTotal;
      this.address = values.Address;
      this.Quantity = values.Quantity;
      this.Price = values.Price;
      this.afterDisc = values.Disc;
      this.text = values.text;
      this.text2 = values.text2;
      this.SKUNo = values.SKUNo;
      console.log(values.Quantity.length);
      console.log(values.Price.length);
    } catch (e) {}
    // this.total = values.Price * values.Quantity.length;
    this.ordersPlaced = JSON.parse(localStorage.getItem("productDetails"));

    //using for calculating products in cart
    try {
      this.mycart = JSON.parse(localStorage.getItem("productDetails"));
      console.log(this.mycart.length);
      this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {}

    // console.log(this.navParams.get("confirmOrder"));
    // let data = this.navParams.get("confirmOrder");
    // this.RollNo = data.RollNo;
    // this.Quantity = data.quantity;
    // this.Price = data.Price;
    // this.total = data.Price;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConfirmOrderPage");
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  textChange() {}

  confirmOrder() {
    let newValue = {
     // quantity: this.Quantity,
      SKUNo: this.SKUNo,
      Price: this.afterDisc || this.GrandTotal,
      Address: this.address,
      Status: "closed"
    };
    console.log(newValue);
    this.getRequest.updateCart(newValue);
    /*  let newValue1 = {
      CutAllocMtrs: this.Quantity,
      RollNo: this.RollNo
    };
    this.getRequest.updateStock(newValue1);*/
    localStorage.removeItem("productDetails");
    this.navCtrl.setRoot("ProductListPage");
  }

  presentToast(action: any) {
    if (action == "failed") {
      let toast = this.toastCtrl.create({
        message: "Inavlid Code",
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
