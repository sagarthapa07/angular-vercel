import { Component } from '@angular/core';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Cart, priceSummary } from '../../../dataType';
import { NgForOf, CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [NgForOf, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartData: Cart[] | undefined
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  

  constructor(private product: ProductsService, private router:Router  ) { }

  ngOnInit(): void {
    this.product.currentCard().subscribe((result) => {
      this.cartData = result;
      let price = 0;

      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 40;

      // Correct total calculation
      this.priceSummary.total = price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;
      
      console.warn(this.priceSummary);
    });
  }

  checkout(){
    this.router.navigate(['checkout'])
  }
}