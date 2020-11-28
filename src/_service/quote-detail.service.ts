import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { QuoteDetails } from "src/_models/quoteDetails";

@Injectable({
  providedIn: "root",
})
export class QuoteDetailService {
  quoteDetailChange = new Subject<QuoteDetails[]>();
  message = new Subject<string>();

  url: string = `${environment.HOST_URL}/quotedetail`;
  constructor(private http: HttpClient) {}

  PayQD(qDetailsId: number, amount: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.put(`${this.url}/pay/${qDetailsId}/${amount}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
}
