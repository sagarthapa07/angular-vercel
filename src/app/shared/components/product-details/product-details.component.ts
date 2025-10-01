import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Cart, Product } from '../../../dataType';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIf, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productData: undefined | Product
  removeCart = false
  constructor(private route: ActivatedRoute, private product: ProductsService) { }
  productQuantity: number = 1;


  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId')
    // console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      // console.warn(result);
      this.productData = result;




      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false;
        }
      }


      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.removeCart = true
          }
        })
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {

    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        console.warn(userId);
        let cartData: Cart = {
          ...this.productData,
          userId, productId: this.productData.id
        }
        delete cartData.id
        // console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
      this.removeCart = false
    } else {

    }

  }
}
