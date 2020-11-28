import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "src/_models/product";
import { ProductService } from "src/_service/product.service";
import { Order } from "src/_models/order";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"],
})
export class ProductlistComponent implements OnInit {
  products: any;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data.items;
      console.log(this.products);
    });
  }
}
