import { Product } from "./product";

export class Quote {
  quoteId: number;
  value: number;
  interest: number;
  firstPaidDay: Date;
  lastPaidDay: Date;
  quoteDetailsId: number;
}
