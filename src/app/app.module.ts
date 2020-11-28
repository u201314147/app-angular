import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularComponent } from "./angular/angular.component";
import { HomeComponent } from "src/_pages/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { ProductComponent } from "src/_pages/product/product.component";
import { ProductlistComponent } from "src/_pages/product/productlist/productlist.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductdialogComponent } from "src/_pages/product/productdialog/productdialog.component";
import { CategorydialogComponent } from "src/_pages/productcategory/categorydialog/categorydialog.component";
import { ProductcategoryComponent } from "src/_pages/productcategory/productcategory.component";
import { PaydebtComponent } from "src/_pages/clients/clients-detail/paydebt/paydebt.component";
import { ClientsComponent } from "src/_pages/clients/clients.component";
import { ClientsDetailComponent } from "src/_pages/clients/clients-detail/clients-detail.component";
import { ClientdetailpaydialogComponent } from "src/_pages/clients/clients-detail/clientdetailpaydialog/clientdetailpaydialog.component";
import { OrderComponent } from "src/_pages/order/order.component";
import { OrderuserComponent } from 'src/_pages/order/orderuser/orderuser.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularComponent,
    HomeComponent,
    ProductdialogComponent,
    ProductComponent,
    ProductlistComponent,
    CategorydialogComponent,
    ProductcategoryComponent,
    PaydebtComponent,
    ClientsComponent,
    ClientsDetailComponent,
    ClientdetailpaydialogComponent,
    OrderComponent,
    OrderuserComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSelectModule,
    MatToolbarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  entryComponents: [
    ProductdialogComponent,
    CategorydialogComponent,
    ClientdetailpaydialogComponent,
    PaydebtComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
