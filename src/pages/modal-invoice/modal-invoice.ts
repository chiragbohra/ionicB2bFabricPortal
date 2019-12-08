import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams ,ToastController } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import * as $ from "jquery";
import * as jsPDF from "jspdf";
import { ModalController } from "ionic-angular";

/**
 * Generated class for the ModalInvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-modal-invoice",
  templateUrl: "modal-invoice.html"
})
export class ModalInvoicePage {
  sendEmail;
  InvoiceNo: any;

  constructor(
    public navCtrl: NavController,
    public sentRequest: ServicesProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    //
    //this.sendEmailInvoice(this.sendEmail); //function called to send OrderNo to server
    console.log(this.navParams.get("InvoiceNo"));

    this.generateInvoicePdf();
  }

  //for Invoice History
  sendEmailInvoice(sendEmail) {
    console.log(this.navParams.get("InvoiceHistoryData")); //to get InvoiceNo from Invoice History Page
    var data = this.navParams.get("InvoiceHistoryData");
    var sendEmail: any = {
      InvoiceNo: data.InvoiceNo
    };
    //call this function in constructor to send InvoiceNo to server
    this.sentRequest.sendEmailInvoice(sendEmail); //For POST API

    //
    let toast = this.toastCtrl.create({
      message: "Email is sent successfully",
      duration: 3000
    });
    toast.present();
    //    
  }

  print() {
    window.print();
  }

  generateInvoicePdf() {
    var doc = new jsPDF();

    //now geting data from invoice page in invoiceData variable
    var invoiceData = this.navParams.get("InvoiceHistoryData");

    console.log(invoiceData.InvoiceNo); //to get single data from invoiceData

    var Invoice = invoiceData.InvoiceNo;
    var InvoiceDate = invoiceData.InvoiceDate;

    //to format date
    var InvoiceDt = InvoiceDate.substring(0, 10);

    var InvoiceAmt = invoiceData.InvoiceAmount; //InvoiceAmt not usable so using InvoiceAmount is key

    console.log(InvoiceDt);

    console.log(invoiceData.InvoiceAmount);

    $("#cmd").click(function() {
      doc.text(20, 30, "Invoice No : " + Invoice);
      doc.text(20, 40, "Invoice Date : " + InvoiceDt);
      doc.text(20, 50, "Invoice Amount : " + InvoiceAmt);
      doc.save("invoice.pdf");
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalInvoicePage");
  }
}
