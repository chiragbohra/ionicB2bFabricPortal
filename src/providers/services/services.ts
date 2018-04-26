//import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  constructor(public http: Http) {
    console.log("Hello ServicesProvider Provider");
  }

  getuserDetails() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/showProductList")
        .map(res => res.json().recordsets[0])
        .subscribe(productList => {
          resolve(productList);
        });
    });
  }

  getuserAddress() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/getUserAddress")
        .map(res => res.json().recordsets[0])
        .subscribe(productList => {
          resolve(productList);
        });
    });
  }

  // for -PostApi UserAuthentication
  createReview(review) {
    // review-array stores username and password
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

  getCartDetails() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/getCartDetails")
        .map(res => res.json().recordsets[0])
        .subscribe(cartDetails => {
          resolve(cartDetails);
          //for orderHistory page
          //to get data we changes (this.data to data)
        });
    });
  }

  orderHistory(userId) {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/orderHistory?userId=" + userId)
        .map(res => res.json().recordset)
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);
        });
    });
  }

  //for invoiceHistory page
  invoiceHistory(userId) {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/userInfo?userId=" + userId)
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data); //to get data we changes (this.data to data)
        });
    });
  }

  postOrder(cartData) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.http
      .post("http://localhost:5000/addToCart", JSON.stringify(cartData), {
        headers: headers
      })
      .subscribe(URL => {
        console.log(URL);
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
          resolve(data); //to get data we changes (this.data to data)
        });
    });
  }

  //for ForgetPage using
  toGetUsernameEmail() {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/usernameEmail")
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data); //to get data we changes (this.data to data)
        });
    });
  }

  updateCart(newValue) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    // this.http.put("http://ec2-34-203-196-198.compute-1.amazonaws.com:8000/api/borrowerRequest", JSON.stringify(newValue), { headers: headers })
    this.http
      .put("http://localhost:5000/updateCart", JSON.stringify(newValue), {
        headers: headers
      })
      .subscribe(res => {
        console.log(res.json());
      });
  }

  updateStock(newValue) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    // this.http.put("http://ec2-34-203-196-198.compute-1.amazonaws.com:8000/api/borrowerRequest", JSON.stringify(newValue), { headers: headers })
    this.http
      .put("http://localhost:5000/updateStock", JSON.stringify(newValue), {
        headers: headers
      })
      .subscribe(res => {
        console.log(res.json());
      });
  }

  getUserInfo(userId) {
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/userInfo?userId=" + userId)
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data); //to get data we changes (this.data to data)
        });
    });
  }
}
