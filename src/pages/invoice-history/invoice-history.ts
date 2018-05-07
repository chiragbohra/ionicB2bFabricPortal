import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";

@IonicPage()
@Component({
  selector: "page-invoice-history",
  templateUrl: "invoice-history.html"
})
export class InvoiceHistoryPage {
  mycart;
  badge;
  viewData: any;

  searchQuery: string = "";
  items;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentRequest: ServicesProvider
  ) {
    this.initializeviewData(); //method call here to get data

    //using for calculating products in cart
    try {
      //try-catch used to handle length error in console
    this.mycart = JSON.parse(localStorage.getItem("productDetails"));
    console.log(this.mycart.length);
    this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {}
  }

  initializeviewData() {
    //method  to get data from server
    // this.sentRequest.invoiceHistory().then(getorderdata => {
    //   // getorderdata it is variable
    //   this.viewData = getorderdata;
    //   console.log(JSON.stringify(getorderdata));
    // });
    //to get data from server to this page
    console.log(localStorage.getItem("userId"));
    let userId = localStorage.getItem("userId");

    this.sentRequest.invoiceHistory(userId).then(invoiceHistoryuserInfo => {
      console.log(invoiceHistoryuserInfo);
      this.viewData = invoiceHistoryuserInfo;
    });
  }

  //for searchBar
  getviewData(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.viewData = this.viewData.filter(item => {
        // search By InvoiceNo
        if (
          item.InvoiceNo.toString()
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
        ) {
          return true;
        }
        //now toSearch by InvoiceDate using else if condition
        else if (
          item.InvoiceDate.toString()
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

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InvoiceHistoryPage");
  }
  
}
