import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "src/_models/product";
import { Subject } from "rxjs";
import { ProductCategory } from "src/_models/productCategory";

@Injectable({
  providedIn: "root",
})
export class ProductCategoryService {
  productsChange = new Subject<ProductCategory[]>();
  message = new Subject<string>();

  url: string = `${environment.HOST_URL}/product_categories`;

  constructor(private http: HttpClient) {}

  getAllProductsCategories() {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<ProductCategory[]>(this.url, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  registerProductCategory(products: ProductCategory) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.post(this.url, products, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  updateProductCategory(productsId: number, products: ProductCategory) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.put(`${this.url}/${productsId}`, products, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  deleteProductCategory(productsId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.delete(`${this.url}/${productsId}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
}
