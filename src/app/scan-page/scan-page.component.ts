import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductService} from "../services/product.service";
import {environment} from "../../environments/environment";
import {UserService} from "../services/user.service";
import {OrderService} from "../services/order.service";
import {SnackbarService} from "ngx-snackbar";


@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.scss']
})
export class ScanPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private orderService: OrderService,
    private snackbarService: SnackbarService
  ) {}

  @ViewChild('barcodeInput',{static:false}) barcodeField: ElementRef;
  slides = [];
  users: any;
  selectedUser: any;
  disableBtn: boolean = false;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots":true,
    "nextArrow":`<div class='nav-btn next-slide'><img src="assets/right-arrow.svg" height="20px" width="20px"></div>`,
    "prevArrow":`<div class='nav-btn prev-slide'><img src="assets/double-left.svg" height="20px" width="20px"></div>`,
    "arrows":true,
    "infinite": false,
  };

  ngOnInit() {
    this.slides = [];
    this.users = null;
    this.selectedUser = null;
    this.disableBtn = false;

    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response.data;
      this.users.sort(this.userCompare);
      // creating initials for grouping
      this.users.forEach((data)=> {
          data['initials'] = data['email'][0].toUpperCase();
      });
    });
  }

  get subTotal(): number {
    let total = 0;
    this.slides.forEach((slide)=>{
      total+= slide.price*slide.quantity;
    });
    return total
  }

  get totalQuantity(): number {
    let quantity = 0;
    this.slides.forEach((slide)=>{
      quantity += +slide.quantity;
    });
    return quantity
  };

  userCompare( a, b ) {
    if ( a.email < b.email ){
      return -1;
    }
    if ( a.email > b.email ){
      return 1;
    }
    return 0;
  }
  getInputValue(element){
    this.getDetailsFromBarcode(element.target.value);
    element.target.value="";
  }

  getDetailsFromBarcode(barcode: string) {
    let findItem = false;
    this.slides.forEach((slide,index) => {
       if (slide.barcode === barcode) {
          this.slides[index].quantity++;
          findItem = true;
          return;
       }
    });

    if (findItem) {
      return;
    }
    this.productService.getProductFromBarcode(barcode).subscribe((response: any) =>{
      if (response.data.length == 0) {
        return;
      }
        const product = response.data[0];
        this.addSlide(product);
    },(err) =>  {
      console.log(err)
    });
  }

  addSlide(product: any) {
    const imageURL = this.getImageURL(product.product_image);
    this.slides.push(
      {
        id: product.product_id,
        barcode: product.product_barcode,
        name: product.product_name,
        imageURL: imageURL,
        price: product.price,
        quantity: 1,
      });
  }

  getImageURL(url: string) {
      if (url && (url.includes('http://') || url.includes('https://'))) {
        return url;
      } else {
        return environment.BASE_API_URL+ '/' + url;
      }
  }

  removeSlide(id) {
    this.slides.forEach((slide,index) => {
      if (slide.id === id) {
        this.slides.splice(index,1);
      }
    });

  }

  proceedToEmail() {
    if (this.selectedUser >= 0) {
      this.snackbarService.add({msg:'Please choose email first',color:'red',timeout:5});
      return;
    }
    this.disableBtn = true;
    const body = {
      user_id: this.selectedUser,
      products: [],
    };

    this.slides.forEach((slide)=>{
      body.products.push({
        'qty':slide.quantity,
        'product_id':slide.id,
      });
    });
    this.orderService.placeOrder(JSON.stringify(body)).subscribe(() => {
      this.disableBtn = false;
      this.ngOnInit();
      this.snackbarService.add({msg:'Succesfully added',color:'green'})
    },(err) => {
      console.log(err);
      this.disableBtn = false;
    });
  }

  getFocus() {
    this.barcodeField.nativeElement.focus();
  }
}
