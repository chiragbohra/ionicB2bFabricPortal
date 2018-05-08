import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  Events
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
//import { NativeStorage } from "@ionic-native/native-storage";

@IonicPage()
@Component({
  selector: "page-product-list",
  templateUrl: "product-list.html"
})
export class ProductListPage {
  mycart;
  badge;
  addedToCart: any = [];
  productList;
  searchTerm: string = "";
  t = 20; // Maintains Count of Cards Displayed

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getRequest: ServicesProvider,
    private events: Events,
    private toastCtrl: ToastController
  ) {
    this.getProductList();

    try {
      //try-catch used to handle length error
      this.mycart = JSON.parse(localStorage.getItem("productDetails"));
      console.log(this.mycart.length);
      this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {}
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductListPage");
  }

  setFilteredItems(event) {
    //  this.getProductList();
    var q = event.target.value;
    if (q && q.trim() != "") {
      this.productList = this.productList.filter(getProduct => {
        //console.log(getProduct.skuno)
        if (getProduct.SKUNo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        if (getProduct.BookName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
      });
    } else {
      this.getProductList();
    }
    // if (q.trim().length <= 4) {
    //   this.getProductList();
    // }
  }

  onCancel() {
    this.getProductList();
  }

  getProductList() {
    this.getRequest.getuserDetails().then(productsList => {
      console.log(productsList);
      this.productList = productsList;
      this.addedToCart = new Array(this.productList.length);
    });
  }
  productDetails(results) {
    this.navCtrl.push("ProductDetailsPage", { productSelected: results });
  }

  addToCart(results, index) {
    this.addedToCart[index] = true;
    // results.active = true;
    if (localStorage.getItem("productDetails") == null) {
      var productToCart = [];
    } else {
      productToCart = JSON.parse(localStorage.getItem("productDetails"));
    }

    productToCart.push(results);
    console.log(productToCart);
    var userId = localStorage.getItem("userId");
    let cartData = {
      // Id: results.Id,
      // RollNo: results.RollNo,
      UserId: userId,
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
    this.getRequest.postOrder(cartData);

    localStorage.setItem("productDetails", JSON.stringify(productToCart));

    this.presentToast("addedToCart");

    //using for calculating products in cart
    try {
      //try-catch used to handle length error in console
      this.mycart = JSON.parse(localStorage.getItem("productDetails"));
      console.log(this.mycart.length);
      this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {}
    // this.navCtrl.push("ShoppingCartPage", {
    //   productSelected: this.productToCart
    // });

    // this.nativeStorage
    //   .setItem("productDetails", {
    //     productDetails: this.productToCart
    //   })
    //   .then(
    //     () => console.log("New value Stored!"),
    //     error => console.error("Error storing item", error)
    //   );

    //events used to get data on badge without refreshing the page
    this.events.publish("user:badge", this.badge); //setting badges value for getting on menu
  }

  method(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1500);
    this.t = this.t + 20; //add 20 cards more
  }

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        this.productList.push(this.productList.length);
      }
      console.log("Async operation has ended");
      infiniteScroll.complete();
    }, 500);
  }

  viewCart(results) {
    this.navCtrl.setRoot("ShoppingCartPage");
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

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    this.getProductList();
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 2000);
  }
}
