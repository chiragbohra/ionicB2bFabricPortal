import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { NativeStorage } from "@ionic-native/native-storage";
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

  productInCart: any;
  price = 100;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private nativeStorage: NativeStorage // public modalCtrl: ModalController
  ) {
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
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
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

  trackByIndex(index: number, value: number) {
    console.log(index);
    console.log(value);
    return index;
  }

  continue() {
    let orderValues = {
      Quantity: this.quantity,
      Price: this.price
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

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    // this.remove();
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
}
