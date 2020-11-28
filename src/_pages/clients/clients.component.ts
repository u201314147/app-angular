import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Customer } from "src/_models/customer";
import { CustomerService } from "src/_service/customer.service";
import { LoginService } from "src/_service/login.service";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  User: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["nombre", "description", "loc", "acciones"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.User = this.loginService.getUser();

    this.customerService.getOnlyCustomer().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delete(client: Customer) {
    this.customerService.deleteCustomer(client.customerId).subscribe((data) => {
      this.customerService.getOnlyCustomer().subscribe((products) => {
        this.customerService.message.next("Se elimino");
      });
    });
  }
  EditClient(client: Customer) {
    this.router.navigate(["/angular/clients-details", client.customerId]);
  }
}
