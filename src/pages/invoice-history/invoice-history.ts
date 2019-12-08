import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { ModalController } from "ionic-angular";
//import * as $ from "jquery";
//import * as jsPDF from "jspdf";

@IonicPage()
@Component({
  selector: "page-invoice-history",
  templateUrl: "invoice-history.html"
})
export class InvoiceHistoryPage {
  mycart;
  badge;
  viewData: any;
  AmountOwingData: any;
  OverDueData: any;
  OrderGeneratedData: any;

  Owing;
  AmountOwing: any;
  OverDue: any;
  OrderGenerated: any;
  InvoiceNo: any;
  searchQuery: string = "";
  items;

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
    } catch (e) {}
  }

  initializeviewData() {
    //method  to get data from server
    // this.sentRequest.invoiceHistory().then(getorderdata => {
    //   // getorderdata it is variable
    //   this.viewData = getorderdata;
    //   console.log(JSON.stringify(getorderdata));
    // });

    //1 to get data from server to this page
    console.log(localStorage.getItem("userId"));
    let userId = localStorage.getItem("userId");

    this.sentRequest.invoiceHistory(userId).then(invoiceHistoryuserInfo => {
      console.log(invoiceHistoryuserInfo);
      this.viewData = invoiceHistoryuserInfo;
    });

    //2 to get AmountOwing data from server to this page
    this.sentRequest
      .invoiceHistoryAmountOwing(userId)
      .then(invoiceHistoryAmountOwing => {
        console.log(invoiceHistoryAmountOwing);
        this.AmountOwingData = invoiceHistoryAmountOwing;
        //to get single data  (loop used) from AmountOwingData
        for (var j = 0; j < this.AmountOwingData.length; j++) {
          console.log(this.AmountOwingData[0].CreditLimit);
          this.Owing = "₹" + this.AmountOwingData[0].CreditLimit;
        }
      });

    //3 to get OverDue data from server to this page
    this.sentRequest
      .invoiceHistoryOverDue(userId)
      .then(invoiceHistoryOverDue => {
        console.log(invoiceHistoryOverDue);
        this.OverDueData = invoiceHistoryOverDue;
        //to get single data from OverDueData
        for (var j = 0; j < this.OverDueData.length; j++) {
          console.log(this.OverDueData[0].OTP);
          this.OverDue = "₹" + this.OverDueData[0].OTP;
        }
      });

    //4 to get OrderGenerated  data from server to this page
    this.sentRequest
      .invoiceHistoryOrderGenerated(userId)
      .then(invoiceHistoryOrderGenerated => {
        console.log(invoiceHistoryOrderGenerated);
        this.OrderGeneratedData = invoiceHistoryOrderGenerated;

        //to get single data from OrderGeneratedData
        for (var j = 0; j < this.OrderGeneratedData.length; j++) {
          console.log(this.OrderGeneratedData[0].BILLAMT);
          this.OrderGenerated = "₹" + this.OrderGeneratedData[0].BILLAMT;
        }
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

  //to send email

  // sendEmailInvoice(results) {
  //   console.log(results.InvoiceNo);
  //   var sendEmail = {
  //     InvoiceNo: results.InvoiceNo
  //   };
  //   this.sentRequest.sendEmailInvoice(sendEmail); //For POST API
  // }

  //to print

  // print() {
  //    window.print();
  //  }

  //to generate pdf

  // generatePdf() {
  //   var doc = new jsPDF();
  //   var specialElementHandlers = {
  //     "#editor": function(element, renderer) {
  //       return true;
  //     }
  //   };

  //   $("#cmd").click(function() {
  //     doc.fromHTML($("#content").html(), 15, 15, {
  //       width: 170,
  //       elementHandlers: specialElementHandlers
  //     });
  //     doc.save("sample-file.pdf");
  //   });
  // }

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InvoiceHistoryPage");
  }

  //modal created and send Invoice page Data to modal page
  showModal(results) {
    var InvoiceHistoryData = {
      //storing data in array to push data
      InvoiceNo: results.InvoiceNo,
      InvoiceDate: results.InvoiceDate,
      InvoiceAmount: results.InvoiceAmt
    };
    var modal = this.modalCtrl.create("ModalInvoicePage", {
      InvoiceHistoryData: InvoiceHistoryData
    });
    modal.present();
    console.log(results.InvoiceNo);
  }
}
