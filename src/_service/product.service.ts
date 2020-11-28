import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "src/_models/product";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  productsChange = new Subject<Product[]>();
  message = new Subject<string>();

  url: string = `${environment.HOST_URL}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any[]>(this.url, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getProductById(productsId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any[]>(`${this.url}/${productsId}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  registerProduct(products: Product) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.post(this.url, products, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  updateProduct(productsId: number, products: Product) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.put(`${this.url}/${productsId}`, products, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  deleteProduct(productsId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.delete(`${this.url}/${productsId}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getMenuDelDia(dia: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get(`${this.url}/day/${dia}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getPlatoCarta() {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get(`${this.url}/category/1`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
}
