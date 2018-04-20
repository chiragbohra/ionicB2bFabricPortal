import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { NativeStorage } from "@ionic-native/native-storage";
import { ModalController } from "ionic-angular";
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
  quantity;

  productInCart: any;
  price = 100;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private nativeStorage: NativeStorage,
    public modalCtrl: ModalController
  ) {
    console.log(this.navParams.get("productSelected"));
    // this.productInCart = this.navParams.get("productSelected");

    this.getRequest.getCartDetails().then(cartDetails => {
      console.log(cartDetails);
      this.cartDetails = cartDetails;
    });

    this.nativeStorage.getItem("productDetails").then(
      data => {
        let productSelected = data;
        console.log(data);
        this.productInCart = data.productDetails;
        this.SKUNo = JSON.stringify(productSelected["productDetails"].SKUNo);
        this.CustDesign = JSON.stringify(
          productSelected["productDetails"].CustDesign
        );
        this.CustShade = JSON.stringify(
          productSelected["productDetails"].CustShade
        );
        this.Width = JSON.stringify(productSelected["productDetails"].Width);
        this.FreshMtrs = JSON.stringify(
          productSelected["productDetails"].FreshMtrs
        );
      },
      error => console.log(error)
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShoppingCartPage");
  }

  remove() {
    this.nativeStorage.remove("productDetails");
  }

  order(results) {
    let newValue = {
      quantity: this.quantity,
      RollNo: results.RollNo,
      Price: this.price
    };

    let modal = this.modalCtrl.create("ConfirmOrderPage", {
      confirmOrder: newValue
    });
    modal.onDidDismiss(() => {
      this.nativeStorage.remove("productDetails");
    });
    modal.present();
  }
}
