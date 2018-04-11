import { Component, ViewChild } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Nav, Platform } from "ionic-angular";
//import { NavController } from "ionic-angular";

//import { LoginPage } from "../pages/login/login";
//import { DashboardPage } from "../pages/dashboard/dashboard";
/*
import { ProductListPage } from "../pages/product-list/product-list";
import { OrdersPage } from "../pages/orders/orders";
import { InvoicesPage } from "../pages/invoices/invoices";
import { AccountsPage } from "../pages/accounts/accounts";
import { ShoppingCartPage } from "../pages/shopping-cart/shopping-cart";
import { CustomerUpdatesPage } from "../pages/customer-updates/customer-updates";
import { UserProfileManagementPage } from "../pages/user-profile-management/user-profile-management";
import { AnalyticsPage } from "../pages/analytics/analytics";
*/
//import { ForgetPage } from "../pages/forget/forget";


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = "LoginPage";
  pages: Array<{ title: string; icon: string; component: any }>;

  constructor(
    // public navCtrl: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
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
          icon: "ios-archive-outline",
          component: "OrdersPage"
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
        //   { title: 'List', component: ListPage }
      ];
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
