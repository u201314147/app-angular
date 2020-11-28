import { Customer } from "./customer";
import { OrderDetail } from "./orderDetail";
import { MatTableDataSource } from "@angular/material/table";
import { createQuoteDetailsDto } from "./createQuoteDetailsDto";

export class Order {
  id: number;
  orderDetails?: OrderDetail[] | MatTableDataSource<OrderDetail>;
  costumer: Customer;
  customerId: number;
  initTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  quoteDetails?: createQuoteDetailsDto;
}
