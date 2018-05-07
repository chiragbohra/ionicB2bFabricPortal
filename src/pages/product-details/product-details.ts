import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-product-details",
  templateUrl: "product-details.html"
})
export class ProductDetailsPage {
  SKUNo;
  CustDesign;
  CustShade;
  Width;
  RollMtrs;
  addedToCart: boolean = false;
  // productToCart: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private toastCtrl: ToastController
  ) {
    let product = this.navParams.get("productSelected");
    console.log(product);
    console.log(product.SKUNo);
    this.SKUNo = product.SKUNo;
    this.CustDesign = product.CustDesign;
    this.CustShade = product.CustShade;
    this.Width = product.Width;
    this.RollMtrs = product.RollMtrs;
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductDetailsPage");
  }

  addToCart() {
    if (localStorage.getItem("productDetails") == null) {
      var productToCart = [];
    } else {
      productToCart = JSON.parse(localStorage.getItem("productDetails"));
    }

    let results = this.navParams.get("productSelected");
    productToCart.push(results);
    console.log(productToCart);
    let cartData = {
      Id: results.Id,
      RollNo: results.RollNo,
      RollMtrs: results.RollMtrs,
      Width: results.Width,
      CustDesign: results.CustDesign,
      CustShade: results.CustShade,
      BookName: results.BookName,
      CutAllocMtrs: results.CutAllocMtrs,
      SKUNo: results.SKUNo,
      Status: "Open"
    };
    console.log(cartData);
    // this.getRequest.postOrder(cartData);
    this.addedToCart = true;
    this.presentToast("addedToCart");
    // this.navCtrl.push("ShoppingCartPage");
    localStorage.setItem("productDetails", JSON.stringify(productToCart));
  }

  viewCart() {
    this.navCtrl.push("ShoppingCartPage");
  }

  presentToast(action: any) {
    if (action == "addedToCart") {
      let toast = this.toastCtrl.create({
        message: "Added To Cart",
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
