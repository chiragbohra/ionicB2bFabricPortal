import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { MyApp } from "./app.component";
import { ServicesProvider } from "../providers/services/services";
import { HttpClientJsonpModule } from "@angular/common/http";

//import { LoginPage } from "../pages/login/login";
//import { ForgetPage } from "../pages/forget/forget";
/*
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

//import { App, MenuController } from "ionic-angular";

@NgModule({
  declarations: [
    MyApp
    // DashboardPage
    /*
    ProductListPage,
    OrdersPage,
    InvoicesPage,
    AccountsPage,
    ShoppingCartPage,
    CustomerUpdatesPage,
    UserProfileManagementPage,
    HttpClientJsonpModule
    */
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp),HttpModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    //ForgetPage
    // DashboardPage
    /*
    ProductListPage,
    OrdersPage,
    InvoicesPage,
    AccountsPage,
    ShoppingCartPage,
    CustomerUpdatesPage,
    UserProfileManagementPage,
    AnalyticsPage
    */
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicesProvider,
    HttpModule
  ]
})
export class AppModule {}
