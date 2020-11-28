import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductCategory } from "src/_models/productCategory";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ProductCategoryService } from "src/_service/productcategory.service";
import { LoginService } from "src/_service/login.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { CategorydialogComponent } from "./categorydialog/categorydialog.component";

@Component({
  selector: "app-productcategory",
  templateUrl: "./productcategory.component.html",
  styleUrls: ["./productcategory.component.css"],
})
export class ProductcategoryComponent implements OnInit {
  User: string;
  productCategories: Array<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["nombre", "description", "acciones"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private productCategoryService: ProductCategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.User = this.loginService.getUser();

    this.productCategoryService.productsChange.subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productCategoryService.message.subscribe((data) => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.productCategoryService
      .getAllProductsCategories()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<any>(data.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productCategories = data.items;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(productCategory?: ProductCategory) {
    let categorydialog =
      productCategory != null ? productCategory : new ProductCategory();
    this.dialog.open(CategorydialogComponent, {
      width: "250px",
      disableClose: false,
      data: categorydialog,
    });
  }

  delete(productCategory: ProductCategory) {
    this.productCategoryService
      .deleteProductCategory(productCategory.product_CategoryId)
      .subscribe((data) => {
        this.productCategoryService
          .getAllProductsCategories()
          .subscribe((products) => {
            this.productCategoryService.productsChange.next(products);
            this.productCategoryService.message.next("Se elimino");
          });
      });
  }
}
