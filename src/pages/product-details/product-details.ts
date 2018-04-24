import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { NativeStorage } from "@ionic-native/native-storage";

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
  FreshMtrs;
  productToCart: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private nativeStorage: NativeStorage
  ) {
    let product = this.navParams.get("productSelected");
    console.log(product);
    console.log(product.SKUNo);
    this.SKUNo = product.SKUNo;
    this.CustDesign = product.CustDesign;
    this.CustShade = product.CustShade;
    this.Width = product.Width;
    this.FreshMtrs = product.FreshMtrs;
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductDetailsPage");
  }

  addToCart() {
    let results = this.navParams.get("productSelected");
    this.productToCart.push(results);
    console.log(this.productToCart);
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

    this.navCtrl.push("ShoppingCartPage");
    this.nativeStorage
      .setItem("productDetails", {
        productDetails: this.productToCart
      })
      .then(
        () => console.log("New value Stored!"),
        error => console.error("Error storing item", error)
      );
  }
}
