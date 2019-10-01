import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.scss']
})
export class ChooseUserComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private userService: UserService,
  ) { }
  public products: any;
  public users: any;

  ngOnInit() {
    this.products = this.productService.getProductData();

    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response.data;
    });
  }

}
