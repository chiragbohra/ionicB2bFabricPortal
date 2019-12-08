import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams ,ToastController} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import * as $ from "jquery";
import * as jsPDF from "jspdf";
import { ModalController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-modal-buttons",
  templateUrl: "modal-buttons.html"
})
export class ModalButtonsPage {
  // viewData: any;
  OrderNo: any;
  orderData: any;
  // order: any;

  sendEmail: any;

  constructor(
    public navCtrl: NavController,
    public sentRequest: ServicesProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
   // this.sendEmailOrder(this.sendEmail); //function called to send OrderNo to server
    console.log(this.navParams.get("OrderNo"));
    // //2nd
    // this.sendEmailInvoice(this.sendEmail); //function called to send OrderNo to server
  }

  //for Order History
  sendEmailOrder(sendEmail) {
    console.log(this.navParams.get("orderHistoryData")); //to get OrderNo from Order History Page
    var data = this.navParams.get("orderHistoryData");
    var sendEmail: any = {
      OrderNo: data.OrderNo
    };
    //call this function in constructor to send OrderNo to server
    this.sentRequest.sendEmailOrder(sendEmail); //For POST API

    //
    let toast = this.toastCtrl.create({
      message: "Email is sent successfully",
      duration: 3000
    });
    toast.present();
    //
  }

  // //for Invoice History
  // sendEmailInvoice(sendEmail) {
  //   console.log(this.navParams.get("InvoiceNo")); //to get InvoiceNo from Invoice History Page
  //   var sendEmail: any = {
  //     InvoiceNo: this.navParams.get("InvoiceNo")
  //   };
  //   //call this function in constructor to send InvoiceNo to server
  //   this.sentRequest.sendEmailInvoice(sendEmail); //For POST API
  // }

  print() {
    window.print();
  }

  generatePdf() {
    var doc = new jsPDF();

    //now geting data from invoice page in orderData variable
    var orderData = this.navParams.get("orderHistoryData");

    console.log(orderData.OrderNo); //to get single data from orderData
  
    var Order = orderData.OrderNo;
    var OrderDate = orderData.OrderDate;

     //to format date
     var OrderDt = OrderDate.substring(0, 10);

    var CustDesign = orderData.CustDesign;
    var CustShade = orderData.CustShade;
    var OrdMtrs = orderData.OrdMtrs;
    var DispatchMtrs = orderData.DispatchMtrs;
    var DeliveryDate = orderData.DeliveryDate;

    //to format date
    var DeliveryDt = DeliveryDate.substring(0, 10);

    $("#cmd").click(function() {
      console.log(Order);
      doc.text(20, 30, "Order No : " + Order);
      doc.text(20, 40, "Order Date : " + OrderDt);
      doc.text(20, 50, "Cust Design : " + CustDesign);
      doc.text(20, 60, "Cust Shade : " + CustShade);
      doc.text(20, 70, "Ord Mtrs " + OrdMtrs);
      doc.text(20, 80, "Dispatch Mtrs : " + DispatchMtrs);
      doc.text(20, 90, "Delivery Date : " + DeliveryDt);

      // doc.text(20, 30, orderData);
      doc.save("order.pdf");
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalButtonsPage");
  }
}
