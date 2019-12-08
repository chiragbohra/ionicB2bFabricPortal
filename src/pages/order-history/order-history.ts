import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { ModalController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-order-history",
  templateUrl: "order-history.html"
})
export class OrderHistoryPage {
  mycart;
  badge;
  viewData: any;
  OrderNo;
  userId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentRequest: ServicesProvider,
    public modalCtrl: ModalController
  ) {
    this.initializeviewData(); //method call here to get data

    //using for calculating products in cart
    try {
      //try-catch used to handle length error in console
      this.mycart = JSON.parse(localStorage.getItem("productDetails"));
      console.log(this.mycart.length);
      this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {} //
  }

  initializeviewData() {
    //to get data from server to this page
    console.log(localStorage.getItem("userId"));
    let userId = localStorage.getItem("userId");

    this.sentRequest.orderHistory(userId).then(orderHistoryUserInfo => {
      console.log(orderHistoryUserInfo);
      this.viewData = orderHistoryUserInfo;
    });
  }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderHistoryPage");
  }

  //for searchBar
  getviewData(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.viewData = this.viewData.filter(item => {
        // search By OrderNo
        if (
          item.OrderNo.toString()
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
        ) {
          return true;
        }
        //now toSearch by OrderDate using else if condition
        else if (
          item.OrderDate.toString()
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
        ) {
          return true;
        }
      });
    } else {
      this.initializeviewData();
    }
  }

  // //modal created and send OrderData to modal page
  // showModal(results) {
  //  var modal = this.modalCtrl.create("ModalButtonsPage", { OrderNo: results.OrderNo });
  //  modal.present();
  //  console.log(results.OrderNo);

  // }

  //modal created and send order page Data to modal page
  showModal(results) {
    var orderHistoryData = {
      //storing data in array to push data
      OrderNo: results.OrderNo,
      OrderDate: results.OrderDate,
      CustDesign: results.CustDesign,
      CustShade: results.CustShade,
      OrdMtrs: results.OrdMtrs,
      DispatchMtrs: results.DispatchMtrs,
      DeliveryDate: results.DeliveryDate
    };
    var modal = this.modalCtrl.create("ModalButtonsPage", {
      orderHistoryData: orderHistoryData
    });
    modal.present();
    console.log(orderHistoryData);
    console.log(results.InvoiceNo);
  }
}
