import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { warn } from 'console';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productData: undefined | Product
 constructor(private route: ActivatedRoute, private product: ProductsService){}
  productQuantity:number = 1;

  // increase() {
  //   this.quantity++;
  // }

  // handleQuantity() {
  //   if (this.quantity > 0) {
  //     this.quantity--;
  //   }
  // }


  handleQuantity(val:string){
    if(this.productQuantity<20 && val === 'plus'){
      this.productQuantity+=1;
      // this.productQuantity=this.productQuantity+1
    }else if(this.productQuantity>1 && val === 'min'){
      this.productQuantity-=1;
    }
  }

 ngOnInit():void{
  let productId = this.route.snapshot.paramMap.get('productId')
  console.warn(productId);
  productId && this.product.getProduct(productId).subscribe((result)=>{
    console.warn(result);
    this.productData = result;
  })
 }
 AddToCart(){
  if(this.productData){
    this.productData.quantity = this.productQuantity;
    if(!localStorage.getItem('user')){
    this.product.localAddToCart(this.productData)
    }
  }
 }
}
