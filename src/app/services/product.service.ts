import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private products: any;

  getProductFromBarcode(barcode: string) {
    return this.httpClient.get(`${environment.BASE_API_URL}/tuckshop/api.php?api_secret=519d26a2e6b755d45469ef1989642938&request_type=product&method=getProductByBarcode&method_param=${barcode}`);
  }

  setProductData(products: any) {
    this.products = products;
  }

  getProductData() {
    return this.products;
  }
}
