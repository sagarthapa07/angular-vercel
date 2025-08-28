import { Component } from '@angular/core';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-seller-home',
  imports: [NgForOf],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined | Product[]
 constructor(private product:ProductsService){}



 ngOnInit(){
  this.product.productList().subscribe((result)=>{
    console.warn(result);
    this.productList=result;
  })
 }



}
