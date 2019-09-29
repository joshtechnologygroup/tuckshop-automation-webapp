import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  placeOrder(body) {
    return this.httpClient.post(`${environment.BASE_API_URL}/tuckshop/api.php?api_secret=519d26a2e6b755d45469ef1989642938&request_type=order&method=postOrder`,body)
  }
}
