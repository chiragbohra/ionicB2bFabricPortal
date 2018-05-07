import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
// import { App, MenuController } from "ionic-angular";


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardPage {
  mycart;
  badge;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {

        //using for calculating products in cart 
        
    try {
      //try-catch used to handle length error
        this.mycart = JSON.parse(localStorage.getItem("productDetails")); 
        console.log(this.mycart.length);  
        this.badge=this.mycart.length; // calculating products in cart to display over badges
      } catch (e) {}  
  }

  ShoppingCartPage(){
  this.navCtrl.push("ShoppingCartPage");
}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DashboardPage");
  }
}