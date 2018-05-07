import { Component, ViewChild } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Nav,Platform } from "ionic-angular";
import { ServicesProvider } from "../providers/services/services";

import { Events } from "ionic-angular";

/*
import { NavController } from "ionic-angular";
import { LoginPage } from "../pages/login/login";
import { ForgetPage } from "../pages/forget/forget";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { ProductListPage } from "../pages/product-list/product-list";
import { OrdersPage } from "../pages/orders/orders";
import { InvoicesPage } from "../pages/invoices/invoices";
import { AccountsPage } from "../pages/accounts/accounts";
import { ShoppingCartPage } from "../pages/shopping-cart/shopping-cart";
import { CustomerUpdatesPage } from "../pages/customer-updates/customer-updates";
import { UserProfileManagementPage } from "../pages/user-profile-management/user-profile-management";
import { AnalyticsPage } from "../pages/analytics/analytics";
*/

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = "LoginPage";

  pages: Array<{ title: string; icon: string; component: any }>;

  mycart;
  badge;




  constructor(
 // public navCtrl: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public ServicesProvider: ServicesProvider,
    public events: Events,
  ) {

    {
      this.pages = [
        {
          title: "Dashboard",
          icon: "ios-grid-outline",
          component: "DashboardPage"
        },
        {
          title: "Product List",
          icon: "ios-clipboard-outline",
          component: "ProductListPage"
        },
        {
          title: "Orders",
          icon:  "ios-archive-outline",
          component: "OrderHistoryPage"
        },
        {
          title: "Invoices",
          icon: "ios-calculator-outline",
          component: "InvoiceHistoryPage"
        },
        // {
        //   title: "Shopping Cart",
        //   icon: "ios-cart-outline",
        //   component: "ShoppingCartPage"
        // },
        {
          title: "My Profile",
          icon: "ios-person-outline",
          component: "UserProfileManagementPage"
        }
      ];


    //events used to get data on badge without refreshing the page  
      events.subscribe("user:badge", user => {  // subscribe to get data from product list page 
        console.log( user);
        this.badge= user;
      });
    }
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    //using for calculating products in cart
    try {
      //try-catch used to handle length error in console
    this.mycart = JSON.parse(localStorage.getItem("productDetails"));
    console.log(this.mycart.length);
    this.badge = this.mycart.length; // calculating products in cart to display over badges
  } catch (e) {}

  }


  // toggleLevel1(idx) {                        //for subMenu
  //   if (this.isLevel1Shown(idx)) {
  //     this.showLevel1 = null;
  //   } else {
  //     this.showLevel1 = idx;
  //   }

  // };

  // toggleLevel2(idx) {                         //for subMenu

  // };

  // isLevel1Shown(idx) {                        //for subMenu
  //   return this.showLevel1 === idx;
  // };

  // isLevel2Shown(idx) {                        //for subMenu
  //   return this.showLevel2 === idx;

  // };


 // for menu List
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
  }

     ShoppingCartPage() {
    this.nav.push("ShoppingCartPage");
  }
}
