import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { customerRegisterDto } from "src/_models/customerRegisterDto";
@Injectable({
  providedIn: "root",
})
export class RegisterService {
  url: string = `${environment.HOST_URL}/identity`;

  constructor(private http: HttpClient) {}

  register(customer: customerRegisterDto) {
    return this.http.post(this.url + "/register", customer);
  }
}
