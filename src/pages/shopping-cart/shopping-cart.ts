import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { NativeStorage } from "@ionic-native/native-storage";
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private nativeStorage: NativeStorage,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController // public modalCtrl: ModalController
  ) {
    this.conditionForm = this.formBuilder.group({
      conditionFormAddress: ["", Validators.required]
    });

    console.log(this.navParams.get("productSelected"));
    // this.productInCart = this.navParams.get("productSelected");

    this.getRequest.getCartDetails().then(cartDetails => {
      console.log(cartDetails);
      this.cartDetails = cartDetails;
    });

    // this.nativeStorage.getItem("productDetails").then(
    //   data => {
    //     let productSelected = data;
    //     console.log(data);
    //     this.productInCart = data.productDetails;
    //     this.SKUNo = JSON.stringify(productSelected["productDetails"].SKUNo);
    //     this.CustDesign = JSON.stringify(
    //       productSelected["productDetails"].CustDesign
    //     );
    //     this.CustShade = JSON.stringify(
    //       productSelected["productDetails"].CustShade
    //     );
    //     this.Width = JSON.stringify(productSelected["productDetails"].Width);
    //     this.FreshMtrs = JSON.stringify(
    //       productSelected["productDetails"].FreshMtrs
    //     );
    //   },
    //   error => console.log(error)
    // );

    console.log(localStorage.getItem("productDetails"));
    this.productInCart = JSON.parse(localStorage.getItem("productDetails"));

    // console.log(this.productInCart.length)
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShoppingCartPage");
  }

  remove(results) {
    var json = JSON.parse(localStorage.getItem("productDetails"));
    for (var i = 0; i < json.length; i++) {
      if (json[i].RollNo == results.RollNo) {
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
    let orderValues = {
      Quantity: this.quantity,
      Price: this.price,
      Address: this.address,
      GrandTotal: this.grandTotal,
      Disc: this.afterDisc
    };
    this.navCtrl.push("ConfirmOrderPage", { values: orderValues });

    // let modal = this.modalCtrl.create("ConfirmOrderPage", {
    //   confirmOrder: newValue
    // });
    // modal.onDidDismiss(() => {
    //   var json = JSON.parse(localStorage.getItem("productDetails"));
    //   for (var i = 0; i < json.length; i++) {
    //     if (json[i].RollNo == results.RollNo) {
    //       json.splice(i, 1);
    //       console.log(json);

    //       localStorage.setItem("productDetails", JSON.stringify(json));
    //     }
    //   }
    //   location.reload();
    // });
    // modal.present();
  }

  radioSelect() {
    let conditionCheck = this.conditionForm.value;
    this.address = conditionCheck["conditionFormAddress"];
    console.log(this.address);
  }

  textChange() {
    for (var i = 0; i < this.quantity.length; i++) {
      let test = this.quantity[i] * this.price;
      console.log(test);
      test += test;
      this.grandTotal = test;
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
