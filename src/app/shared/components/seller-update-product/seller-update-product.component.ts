import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/sellerservice/products.service';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  constructor(private route: ActivatedRoute, private product:ProductsService){}

ngOnInit(): void {
  debugger
  let productID = this.route.snapshot.paramMap.get('id');
  console.log(productID);
  productID &&  this.product.getProduct(productID).subscribe((data)=>{
    console.warn(data);
  })
}

submit(productData:any){

}

}