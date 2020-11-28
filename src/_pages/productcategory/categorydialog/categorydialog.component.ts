import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ProductCategory } from "src/_models/productCategory";
import { ProductCategoryService } from "src/_service/productcategory.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-categorydialog",
  templateUrl: "./categorydialog.component.html",
  styleUrls: ["./categorydialog.component.css"],
})
export class CategorydialogComponent implements OnInit {
  form: FormGroup;
  productCategory: ProductCategory;
  Creado: Boolean;
  constructor(
    private productCategoryService: ProductCategoryService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategory,
    private dialogRef: MatDialogRef<CategorydialogComponent>
  ) {}

  ngOnInit(): void {
    this.productCategory = new ProductCategory();
    this.productCategory.product_CategoryName = this.data.product_CategoryName;
    this.productCategory.product_CategoryDescription = this.data.product_CategoryDescription;
    this.productCategory.state = "UPDATED";
    this.productCategory.product_CategoryId = this.data.product_CategoryId;
    console.log(this.data.product_CategoryName);

    this.Creado = new Boolean();
    this.Creado = false;
    if (
      this.productCategory != null &&
      this.productCategory.product_CategoryId > 0
    ) {
      this.Creado = true;
    }

    if (this.Creado == true) {
      this.form = this.fb.group({
        productCategoryName: new FormControl(this.data.product_CategoryName),
        productCategoryDescription: new FormControl(
          this.data.product_CategoryDescription
        ),
      });

      console.log(this.form);
    } else {
      this.form = this.fb.group({
        productCategoryName: new FormControl(""),
        productCategoryDescription: new FormControl(""),
      });
    }
  }

  registerOrUpdate() {
    this.productCategory.product_CategoryName = this.form.value[
      "productCategoryName"
    ];
    this.productCategory.product_CategoryDescription = this.form.value[
      "productCategoryDescription"
    ];

    if (this.Creado == false) {
      this.productCategory.product_CategoryId = null;
      this.productCategoryService
        .registerProductCategory(this.productCategory)
        .subscribe((data) => {
          this.productCategoryService
            .getAllProductsCategories()
            .subscribe((savings) => {
              this.productCategoryService.productsChange.next(savings);
              this.productCategoryService.message.next("Se registro");
            });
        });
    } else {
      this.productCategoryService
        .updateProductCategory(
          this.productCategory.product_CategoryId,
          this.productCategory
        )
        .subscribe((data) => {
          this.productCategoryService
            .getAllProductsCategories()
            .subscribe((savings) => {
              this.productCategoryService.productsChange.next(savings);
              this.productCategoryService.message.next("Se actualizo");
            });
        });
    }
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
