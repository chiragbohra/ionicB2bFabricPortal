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
  RollNo;
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
    console.log(this.navParams.get("values"));
    let values = this.navParams.get("values");
    this.GrandTotal = values.GrandTotal;
    this.address = values.Address;
    this.Quantity = values.Quantity;
    this.Price = values.Price;
    this.afterDisc = values.Disc;
    this.text = values.text;
    this.text2 = values.text2;
    console.log(values.Quantity.length);
    console.log(values.Price.length);

    // this.total = values.Price * values.Quantity.length;
    this.ordersPlaced = JSON.parse(localStorage.getItem("productDetails"));

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
      quantity: this.Quantity,
      RollNo: this.RollNo,
      Price: this.total,
      Address: this.address,
      Status: "closed"
    };

    this.getRequest.updateCart(newValue);
    let newValue1 = {
      CutAllocMtrs: this.Quantity,
      RollNo: this.RollNo
    };
    this.getRequest.updateStock(newValue1);
    localStorage.removeItem("productDetails");
    this.navCtrl.pop();
    location.reload();
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
