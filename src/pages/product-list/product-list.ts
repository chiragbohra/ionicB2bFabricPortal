import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";


@IonicPage()
@Component({
  selector: "page-product-list",
  templateUrl: "product-list.html"
})
export class ProductListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ServicesProvider:ServicesProvider ) {

    this.ServicesProvider.getReviews().then((data) => {
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductListPage");

  }

  
}
