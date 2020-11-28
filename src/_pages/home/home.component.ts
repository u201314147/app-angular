import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/_models/customer";
import { CustomerService } from "src/_service/customer.service";
import { LoginService } from "src/_service/login.service";
import { MatCardModule } from "@angular/material/card";
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  User: string;
  Email: string;
  UserName: string;
  Customer: Customer;
  constructor(
    private loginService: LoginService,
    private customerService: CustomerService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.User = this.loginService.getUser();
    this.UserName = this.loginService.getUserName();
    this.Email = this.loginService.getEmail();

    console.log(this.User);
    console.log(this.UserName);
  }

  IrPerfil() {
    this.customerService.getByEmail(this.Email).subscribe((data) => {
      this.Customer = data;
      this.router.navigate(["/angular/clients-details", this.Customer.customerId]);
    });
  }

  SignOut(){
    this.loginService.signOut();
    this.document.location.href = environment.SPA_URL+'/react';

  }
}
