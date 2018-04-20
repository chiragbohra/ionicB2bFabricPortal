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
        .get("http://192.168.0.29:5000/showProductList")
        .map(res => res.json().recordsets[0])
        .subscribe(productList => {
          resolve(productList);
        });
    });
  }

  getuserAddress() {
    return new Promise(resolve => {
      this.http
        .get("http://192.168.0.29:5000/getUserAddress")
        .map(res => res.json().recordsets[0])
        .subscribe(productList => {
          resolve(productList);
        });
    });
  }

  getCartDetails() {
    return new Promise(resolve => {
      this.http
        .get("http://192.168.0.29:5000/getCartDetails")
        .map(res => res.json().recordsets[0])
        .subscribe(cartDetails => {
          resolve(cartDetails);
        });
    });
  }

  postOrder(cartData) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Promise(resolve => {
      this.http
        .post("http://192.168.0.29:5000/addToCart", JSON.stringify(cartData), {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(URL => {
          console.log(URL);
          resolve(URL);
        });
    });
  }

  updateCart(newValue) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    // this.http.put("http://ec2-34-203-196-198.compute-1.amazonaws.com:8000/api/borrowerRequest", JSON.stringify(newValue), { headers: headers })
    this.http
      .put("http://192.168.0.29:5000/updateCart", JSON.stringify(newValue), {
        headers: headers
      })
      .subscribe(res => {
        console.log(res.json());
      });
  }
}
