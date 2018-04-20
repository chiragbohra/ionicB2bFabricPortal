import { Component, ViewChild } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Nav, Platform } from "ionic-angular";
import { ServicesProvider } from "../providers/services/services";

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

  pages1: any           // 2nd array

  showLevel1 = null;    // use for toggling menu
  showLevel2 = null;
  idx: any


  constructor(
 // public navCtrl: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public ServicesProvider: ServicesProvider
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
          title: "Invoices",
          icon: "ios-calculator-outline",
          component: "InvoicesPage"
        },
        {
          title: "Accounts",
          icon: "ios-albums-outline",
          component: "AccountsPage"
        },
        {
          title: "Shopping Cart",
          icon: "ios-cart-outline",
          component: "ShoppingCartPage"
        },
        {
          title: "Customer Updates",
          icon: "ios-alert-outline",
          component: "CustomerUpdatesPage"
        },
        {
          title: "User Profile Management",
          icon: "ios-person-outline",
          component: "UserProfileManagementPage"
        },
        {
          title: "Analytics",
          icon: "ios-analytics-outline",
          component: "AnalyticsPage"
        }
      ];
    }

    // 2nd array for subMenu Orders Page

    this.pages1 = [{
      category: "Orders page",
      icon: "ios-albums-outline",
      component: "OrdersPage",
      subs: [
        {
          subcategory: "Order History",
          icon: "ios-archive-outline",
          component: "OrderHistoryPage"
        },
        {
          subcategory: "Invoice History",
          icon: "ios-calculator-outline",
          component: "InvoiceHistoryPage"
        }
      ]
    }
    ]

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  toggleLevel1(idx) {                        //for subMenu
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }

  };

  toggleLevel2(idx) {                         //for subMenu

  };

  isLevel1Shown(idx) {                        //for subMenu
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {                        //for subMenu
    return this.showLevel2 === idx;

  };


 // for menu List
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
  }

  //for subMenu of OrdersPage
    openPage1(page) {              
     // Reset the content nav to have just this page
     // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
