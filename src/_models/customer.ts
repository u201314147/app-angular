import { CustomerCategory } from "./customerCategory";
import { LOC } from "./LOC";

export class Customer {
  customerId: number;
  username: string;
  password: string;
  customerName: string;
  customerLastName: string;
  email: string;
  userEmail: string;
  customerAge: number;
  loc: LOC;
  customerCategory: CustomerCategory;
}
