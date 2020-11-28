import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { QuoteDetails } from "src/_models/quoteDetails";
import { CustomerService } from "src/_service/customer.service";
import { LoginService } from "src/_service/login.service";
import { QuoteDetailService } from "src/_service/quote-detail.service";
import { QuoteService } from "src/_service/quote.service";
import { PaydebtComponent } from "../paydebt/paydebt.component";

@Component({
  selector: "app-clientdetailpaydialog",
  templateUrl: "./clientdetailpaydialog.component.html",
  styleUrls: ["./clientdetailpaydialog.component.css"],
})
export class ClientdetailpaydialogComponent implements OnInit {
  amount: number;
  User: string;
  dataQuotes: MatTableDataSource<any>;
  displayedQuoteColumns: string[] = [
    "value",
    "interest",
    "firstPaidDay",
    "lastPaidDay",
    "actions",
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QuoteDetails,
    private dialogRef: MatDialogRef<ClientdetailpaydialogComponent>,
    private quoteDetailService: QuoteDetailService,
    private customerService: CustomerService,
    private loginService: LoginService,
    private quoteService: QuoteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.User = this.loginService.getUser();

    this.quoteService
      .UpdateInterest(this.data.quoteDetailsId)
      .subscribe((data) => {
        this.dataQuotes = new MatTableDataSource<any>(data);
        this.dataQuotes.paginator = this.paginator;
        this.dataQuotes.sort = this.sort;
      });
  }

  Pay() {
    this.quoteDetailService
      .PayQD(this.data.quoteDetailsId, this.amount)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
  CloseDialog() {
    this.dialogRef.close();
  }

  openDialog(row) {
    this.dialog
      .open(PaydebtComponent, {
        width: "400px",
        disableClose: false,
        data: row,
      })
      .afterClosed()
      .subscribe(() => {
        this.quoteService
          .UpdateInterest(this.data.quoteDetailsId)
          .subscribe((data) => {
            this.dataQuotes = new MatTableDataSource<any>(data);
            this.dataQuotes.paginator = this.paginator;
            this.dataQuotes.sort = this.sort;
          });
      });
  }
}
