import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Headers ,Response } from "@angular/http";
import "rxjs/add/operator/map";
/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  data: any;

  constructor(public http: Http) {
    console.log("Hello ServicesProvider Provider");

    this.data = null;
  }


  // to show productList
  getReviews() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/showProductList")
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(this.data);
        });
    });
  }

  // for -PostApi UserAuthentication
  createReview(review) {              // review-array stores username and password
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Promise(resolve => {
      this.http
        .post(
          "http://localhost:5000/userAuthentication",
          JSON.stringify(review),
          { headers: headers }
        )
        .subscribe(res => {
          console.log(res.json());
        });
    });
  }

  //for orderHistory page
  orderHistory() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/orderHistory")
        .map(res => res.json().recordset)
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);       //to get data we changes (this.data to data)
        });
    });
  }
  
  //for invoiceHistory page
  invoiceHistory() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/invoiceHistory")
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);       //to get data we changes (this.data to data)
        });
    });
  }

  //for loginPage using
  toGetUsernamePassword() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/usernamePassword")
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);       //to get data we changes (this.data to data)
        });
    });
  }

}

