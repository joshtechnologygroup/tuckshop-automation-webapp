import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllUsers() {
    return this.httpClient.get(`${environment.BASE_API_URL}/tuckshop/api.php?api_secret=519d26a2e6b755d45469ef1989642938&request_type=users&method=getAllUsers`);
  }
}
