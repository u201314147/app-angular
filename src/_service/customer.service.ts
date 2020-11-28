import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Customer } from "src/_models/customer";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  customersChange = new Subject<Customer[]>();
  message = new Subject<string>();

  url: string = `${environment.HOST_URL}/customers`;

  constructor(private http: HttpClient) {}

  getAllCustomers() {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any[]>(this.url, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getCustomerByUserName(username) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any>(`${this.url}/user=${username}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getOnlyCustomer() {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any[]>(`${this.url}/onlycustomers`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
  deleteCustomer(clientId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.delete(`${this.url}/${clientId}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getById(clientId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any>(`${this.url}/${clientId}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  getByEmail(email: string) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any>(`${this.url}/email/${email}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
}
