import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
//import { ModalController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-user-profile-management",
  templateUrl: "user-profile-management.html"
})
export class UserProfileManagementPage {
  mycart;
  badge;
  name;
  email;
  phone;
  address1;
  address2;
  address3;
  city;
  pincode;

  inputs: any;

  setDefault: any = []; //to change set default btn to default
  setDefault1: any = [];
  addressline1;
  addressline2;
  addressline3;
  pincode1;
  city1;

  address: any;
  data;
  email3;

  newaddress1: any = [];
  newaddress2: any = [];
  newaddress3: any = [];
  newCity: any = [];
  newPincode: any = [];
  newEmail: any = [];
  newPhone: any = [];

  //
  emailArray: any = []; // to Generat multiple input fields in click btn
  phoneArray: any = [];
  addressArray: any = [];

  public buttonClicked: boolean = false; //using in ng if condition//used to dont show the add btn to multiple times

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentRequest: ServicesProvider,
    public getRequest: ServicesProvider,
    private toastCtrl: ToastController
  ) {
    console.log(localStorage.getItem("userId"));
    let userId = localStorage.getItem("userId");

    this.sentRequest.getUserInfo(userId).then(userInfo => {
      console.log(userInfo);
      try {
        this.name = userInfo[0].CustName;
        this.email = userInfo[0].CustEmail;

        //to format email or to get single email when 2/3 emails are fetched from database
        var email1 = this.email;
        console.log(email1);

        // var email2 = email1.substring(0, 22);
        // console.log(email2);

        // this.email3 = email2;

        // this.email3 = this.email3.substring(0, this.email3.indexOf(";"));
        // console.log(this.email3);

        this.phone = userInfo[0].CustPhone;
        this.address1 = userInfo[0].CustAdd1;
        this.address2 = userInfo[0].CustAdd2;
        this.address3 = userInfo[0].CustAdd3;
        this.city = userInfo[0].CustCity;
        this.pincode = userInfo[0].CustPinCd;
      } catch (e) {}
    });

    //using for calculating products in cart
    try {
      this.mycart = JSON.parse(localStorage.getItem("productDetails"));
      console.log(this.mycart.length);
      this.badge = this.mycart.length; // calculating products in cart to display over badges
    } catch (e) {}
  }

  //to add data to database
  saveToDatabase() {
    //
    let toast = this.toastCtrl.create({
      message: "Your Profile is Updated Successfully",
      duration: 3000
    });
    toast.present();
    //
    let userId = localStorage.getItem("userId");
    ///
    let addressData = {
      UserId: userId,
      Address1: this.newaddress1,
      Address2: this.newaddress2,
      Address3: this.newaddress3,
      City: this.newCity,
      Pincode: this.newPincode,
      Email: this.newEmail,
      Phone: this.newPhone
    };
    console.log(addressData);
    this.getRequest.PostSaveToDatabase(addressData); //For POST API//to add data to database
  }
  //

  ShoppingCartPage() {
    this.navCtrl.push("ShoppingCartPage");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserProfileManagementPage");
  }

  update() {}

  default(i) {
    this.setDefault[i] = true; //to change set default btn to default
    //this.setDefault1[j] = true;
    this.city1 = this.city;
    this.pincode1 = this.pincode;

    this.address = this.address1;

    //  var abc
    //  abc = [{
    //     a: this.address1,
    //     b: this.address2,
    //     c: this.address3
    //   }];

    //  this.address= JSON.parse(abc)
    //   console.log(this.address);
  }

  default1(j) {
    //to change set default btn to default
    this.setDefault1[j] = true;
  }

  AddAddress() {
    this.addressArray.push({ value: "" });
  }
  AddEmail() {
    this.emailArray.push({ value: "" });

    // this.buttonClicked = !this.buttonClicked;
  }
  AddPhone() {
    this.phoneArray.push({ value: "" });

    // this.buttonClicked = !this.buttonClicked;
  }
}
