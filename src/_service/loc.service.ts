import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { LOC } from "src/_models/LOC";

@Injectable({
  providedIn: "root",
})
export class LocService {
  productsChange = new Subject<LOC[]>();
  message = new Subject<string>();

  url: string = `${environment.HOST_URL}/loc`;
  constructor(private http: HttpClient) {}

  updateLOC(locId: number, LOC: LOC) {
    let access_token = JSON.parse(
      sessionStorage.getItem(environment.TOKEN_NAME)
    ).access_token;
    return this.http.put(`${this.url}/${locId}`, LOC, {
      headers: new HttpHeaders()
        .set("Authorization", `bearer ${access_token}`)
        .set("Content-Type", "application/json"),
    });
  }
}
