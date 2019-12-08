import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";

//import { ModalController } from "ionic-angular";
/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-shopping-cart",
  templateUrl: "shopping-cart.html"
})
export class ShoppingCartPage {
  mycart;
  badge;
  SKUNo;
  CustDesign;
  CustShade;
  Width;
  FreshMtrs;
  cartDetails;
  quantity: any = [];
  conditionForm;
  conditionFormAddress;
  productInCart: any;
  price = 100;
  address;
  code;
  total;
  grandTotal: any;
  showButton: boolean = true;
  text: any;
  text2: any;
  afterDisc: any;
  test: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController // public modalCtrl: ModalController
  ) {
    this.conditionForm = this.formBuilder.group({
      conditionFormAddress: ["", Validators.required]
    });

    console.log("quantity", this.quantity);
    console.log(this.navParams.get("productSelected"));
    // this.productInCart = this.navParams.get("productSelected");

    this.getRequest.getCartDetails().then(cartDetails => {
      console.log(cartDetails);
      this.cartDetails = cartDetails;
    });

    console.log(localStorage.getItem("productDetails")); //to get products
    this.productInCart = JSON.parse(localStorage.getItem("productDetails")); // console.log(this.productInCart.length)

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
    console.log("ionViewDidLoad ShoppingCartPage");
    this.test = 0;
    let x = 0;
    for (var i = 0; i < this.quantity.length; i++) {
      this.test = this.quantity[i] * this.price;
      console.log("line155" + this.test);
      x += this.test + this.test;
      //console.log("line158" + x / 2);
      this.grandTotal = x / 2;
    }
  }

  remove(results) {
    var json = JSON.parse(localStorage.getItem("productDetails"));
    console.log(json);
    for (var i = 0; i < json.length; i++) {
      if (json[i].SKUNo == results.SKUNo) {
        json.splice(i, 1);
        console.log(json);

        localStorage.setItem("productDetails", JSON.stringify(json));
      }
    }

    // localStorage.removeItem("productDetails");
    location.reload();
  }

  continue() {
    let conditionCheck = this.conditionForm.value;
    this.address = conditionCheck["conditionFormAddress"];
    console.log(this.address);

    let SKUNoToOrder: any = [];
    for (var i = 0; i < this.productInCart.length; i++) {
      console.log(this.productInCart[i].SKUNo);
      SKUNoToOrder = this.productInCart[i].SKUNo;
    }
    ///
    let orderValues = {
      Quantity: this.quantity,
      Price: this.price,
      Address: this.address,
      GrandTotal: this.grandTotal,
      Disc: this.afterDisc,
      text: this.text,
      text2: this.text2,
      SKUNo: SKUNoToOrder
    };
    this.navCtrl.push("ConfirmOrderPage", { values: orderValues });

    ///
    let toast = this.toastCtrl.create({
      message: "Your Order is placed successfully",
      duration: 3000
    });
    toast.present();
    ///
  }

  radioSelect() {
    let conditionCheck = this.conditionForm.value;
    this.address = conditionCheck["conditionFormAddress"];
    console.log(this.address);
  }

  textChange() {
    this.test = 0;
    let x = 0;
    for (var i = 0; i < this.quantity.length; i++) {
      this.test = this.quantity[i] * this.price;
      console.log("line155" + this.test);
      x += this.test + this.test;
      //console.log("line158" + x / 2);
      this.grandTotal = x / 2;
    }
  }

  discount() {
    if (this.code == "DISC10") {
      this.afterDisc = Math.round(this.grandTotal - this.grandTotal * 0.1);
      this.showButton = false;
      this.text = "10% Discount with code DISC10";
      this.text2 = this.grandTotal * 0.1;
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

    //
    let toast = this.toastCtrl.create({
      message: "Coupan Code Applied",
      duration: 3000
    });
    toast.present();
    //
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

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    // this.remove();
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
}
