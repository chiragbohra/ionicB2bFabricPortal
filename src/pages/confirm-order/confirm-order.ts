import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
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
  Quantity;
  Price;
  status;
  code;
  total;
  conditionForm;
  conditionFormAddress;
  address;
  showButton: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public getRequest: ServicesProvider,
    private toastCtrl: ToastController
  ) {
    this.conditionForm = this.formBuilder.group({
      conditionFormAddress: ["", Validators.required]
    });

    console.log(this.navParams.get("confirmOrder"));
    let data = this.navParams.get("confirmOrder");
    this.RollNo = data.RollNo;
    this.Quantity = data.quantity;
    this.Price = data.Price;
    this.total = data.Price;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConfirmOrderPage");
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  textChange() {}

  discount() {
    if (this.code == "DISC10") {
      this.total = Math.round(this.total - this.total * 0.1);
      this.showButton = false;
    } else if (this.code == "DISC20") {
      this.total = Math.round(this.total - this.total * 0.2);
      this.showButton = false;
    } else if (this.code == "DISC30") {
      this.total = Math.round(this.total - this.total * 0.3);
      this.showButton = false;
    } else if (this.code == "DISC40") {
      this.total = Math.round(this.total - this.total * 0.4);
      this.showButton = false;
    } else {
      this.presentToast("failed");
    }
    console.log(this.total);
  }

  radioSelect() {
    let conditionCheck = this.conditionForm.value;
    this.address = conditionCheck["conditionFormAddress"];
    console.log(this.address);
  }

  confirmOrder() {
    let conditionCheck = this.conditionForm.value;
    this.address = conditionCheck["conditionFormAddress"];

    let newValue = {
      quantity: this.Quantity,
      RollNo: this.RollNo,
      Price: this.total,
      Address: this.address,
      Status: "closed"
    };

    this.getRequest.updateCart(newValue);
    this.navCtrl.pop();
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
