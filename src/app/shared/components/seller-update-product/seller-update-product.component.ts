import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData: undefined | Product
  productMessage: undefined | string
  constructor(private route: ActivatedRoute, private product: ProductsService) { }

  ngOnInit(): void {
    let productID = this.route.snapshot.paramMap.get('id');
    console.log(productID);
    productID && this.product.getProduct(productID).subscribe((data) => {
      console.warn(data);
      this.productData = data
    })
  }

  submit(data: Product) {
    console.warn(data);
    if(this.productData){
      data.id = this.productData.id
    }

    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is Updated"
      }
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)
  }

}