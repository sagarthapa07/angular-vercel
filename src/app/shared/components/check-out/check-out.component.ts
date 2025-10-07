import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Cart, order } from '../../../dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  totalPrice: number | undefined
  cartData: Cart[] | undefined
  orderMsg: string | undefined
  isOrderPlaced: boolean = false;
  constructor(private product: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCard().subscribe((result) => {
      let price = 0;
      this.cartData = result

      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
    });
  }

  orderNow(form: any) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }
    let data = form.value;
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.isOrderPlaced = true;
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 700)
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Your Order has been placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined
          }, 4000);
        }else{
          this.isOrderPlaced = false;
        }
      })
    }
  }
}
