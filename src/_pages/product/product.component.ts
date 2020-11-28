import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "src/_service/product.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/_models/product";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ProductdialogComponent } from "./productdialog/productdialog.component";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginService } from "src/_service/login.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  User: string;
  products: Array<any>;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    "nombre",
    "precio",
    "stock",
    "categoria",
    "acciones",
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.User = this.loginService.getUser();

    this.productService.productsChange.subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productService.message.subscribe((data) => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.productService.getAllProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.products = data.items;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(product?: Product) {
    let productdialog = product != null ? product : new Product();
    this.dialog.open(ProductdialogComponent, {
      width: "250px",
      disableClose: false,
      data: productdialog,
    });
  }

  delete(product: Product) {
    this.productService.deleteProduct(product.productId).subscribe((data) => {
      this.productService.getAllProducts().subscribe((products) => {
        this.productService.productsChange.next(products);
        this.productService.message.next("Se elimino");
      });
    });
  }
}
