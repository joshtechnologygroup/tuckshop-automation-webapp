import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit {

  constructor() { }
  barcodes: string[];

  ngOnInit() {}

  getInputValue(element){
    this.getDetailsFromBarcode(element.target.value);
    element.target.value="";
  }

  getDetailsFromBarcode(barcode: string) {
    this.barcodes.push(barcode);
    alert(barcode);
  }

}
