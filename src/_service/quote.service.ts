import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Quote } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { QuoteDetails } from "src/_models/quoteDetails";

@Injectable({
  providedIn: "root",
})
export class QuoteService {
  quoteDetailChange = new Subject<Quote[]>();
  message = new Subject<string>();

  url: string = `${environment.HOST_URL}/quote`;
  constructor(private http: HttpClient) {}

  UpdateInterest(quotedetailsId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any[]>(
      `${this.url}/updateInterest/${quotedetailsId}`,
      {
        headers: new HttpHeaders()
          .set("Authorization", `bearer ${access_token}`)
          .set("Content-Type", "application/json"),
      }
    );
  }
  GetQuotes(quotedetailsId: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.get<any[]>(`${this.url}/quotedetails/${quotedetailsId}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }

  PayQuote(quoutId: number, amount: number) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.put(`${this.url}/pay/${quoutId}/${amount}`, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
}
