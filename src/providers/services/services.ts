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
    //For List Page
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
    //for shopping cart page //for GET API
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
    // for order history Page
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/orderHistoryUserInfo?userId=" + userId)
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);
        });
    });
  }

  //AmountOwing
  invoiceHistoryAmountOwing(userId) {
    // for order history oage
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/invoiceHistoryAmountOwing?userId=" + userId)
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);
        });
    });
  }

  //OverDue
  invoiceHistoryOverDue(userId) {
    // for order history oage
    return new Promise(resolve => {
      this.http
        .get("http://localhost:5000/invoiceHistoryOverDue?userId=" + userId)
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data);
        });
    });
  }

  //Order Generated
  invoiceHistoryOrderGenerated(userId) {
    // for order history oage
    return new Promise(resolve => {
      this.http
        .get(
          "http://localhost:5000/invoiceHistoryOrderGenerated?userId=" + userId
        )
        .map(res => res.json().recordsets[0])
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
        .get("http://localhost:5000/invoiceHistoryuserInfo?userId=" + userId)
        .map(res => res.json().recordsets[0])
        .subscribe(data => {
          console.log(data);
          // this.data = data;
          resolve(data); //to get data we changes (this.data to data)
        });
    });
  }

  //for Product List page
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

  //for UserProfile page //saving address data
  PostSaveToDatabase(addressData) {
    console.log(addressData);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.http
      .post(
        "http://localhost:5000/customersDetails",
        JSON.stringify(addressData),
        {
          headers: headers
        }
      )
      .subscribe(URL => {
        console.log(URL);
      });
  }

  //for invoice History page // for POST API
  sendEmailInvoice(results) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.http
      .post("http://localhost:5000/sendEmailInvoice", JSON.stringify(results), {
        headers: headers
      })
      .subscribe(URL => {
        console.log(URL);
      });
  }

  //for order History page // for POST API
  sendEmailOrder(sendEmail) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.http
      .post("http://localhost:5000/sendEmailOrder", JSON.stringify(sendEmail), {
        headers: headers
      })
      .subscribe(URL => {
        console.log(URL);
      });
  }

  //for ForgetPage to send password  //for POST API
  RequestNewPassword(NewPassword) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.http
      .post(
        "http://localhost:5000/sendNewPassword",
        JSON.stringify(NewPassword),
        {
          headers: headers
        }
      )
      .subscribe(URL => {
        console.log(URL);
      });
  }

  //for loginPage
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

  //for ForgetPage  //for GET API
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

  //for PUT api for confirm order page
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

  //for user profile management
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
