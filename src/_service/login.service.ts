import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { customerLoginDto } from "src/_models/customerLoginDto";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  url: string = `${environment.HOST_URL}/identity`;

  constructor(private http: HttpClient, private router: Router) {}

  login(customer: customerLoginDto) {
    return this.http.post(this.url + "/login", customer, {
      responseType: "text",
    });
  }
  isLogged() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  getUser() {
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk);
    let user = decodedToken.role;
    return user;
  }

  getUserName() {
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk);
    let userName = decodedToken.unique_name + " " + decodedToken.family_name;
    return userName;
  }

  getEmail() {
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk);
    let email = decodedToken.email;
    return email;
  }

  signOut() {
    sessionStorage.removeItem("access_token");
  }
}
