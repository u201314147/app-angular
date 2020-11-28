import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Quote } from "src/_models/quote";
import { QuoteService } from "src/_service/quote.service";

@Component({
  selector: "app-paydebt",
  templateUrl: "./paydebt.component.html",
  styleUrls: ["./paydebt.component.css"],
})
export class PaydebtComponent implements OnInit {
  amount: number;
  totalDebt: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Quote,
    private matSnackBar: MatSnackBar,
    private quoteService: QuoteService,
    private dialogRef: MatDialogRef<PaydebtComponent>
  ) {}

  ngOnInit(): void {
    this.totalDebt = this.data.interest + this.data.value;
  }

  Pay() {
    if (this.amount < this.totalDebt && this.data.interest > 0) {
      this.matSnackBar.open(
        "Si existe mora, debe hacer un pago total",
        "Aceptar",
        {
          duration: 2000,
        }
      );
    } else if (this.amount > this.totalDebt) {
      this.matSnackBar.open(
        "Por favor pague como maximo: " + this.totalDebt,
        "Aceptar",
        {
          duration: 2000,
        }
      );
    } else {
      this.quoteService
        .PayQuote(this.data.quoteId, this.amount)
        .subscribe(() => {
          this.matSnackBar.open("Se ha pagado la cuota", "Aceptar", {
            duration: 2000,
          });
          this.dialogRef.close();
        });
    }
  }
  CloseDialog() {
    this.dialogRef.close();
  }
}
