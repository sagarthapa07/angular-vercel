import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { order } from '../../../dataType';

@Component({
  selector: 'app-check-out',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent {
  totalPrice:number|undefined
  constructor(private product: ProductsService) { }

  ngOnInit(): void {
    this.product.currentCard().subscribe((result) => {
      let price = 0;

      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + (price/10)+100-(price/10);

      console.warn(this.totalPrice);
    });
  }



  orderNow(data:{email:string,address:string,contact:string}) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order ={
        ...data,
        totalPrice:this.totalPrice,
        userId
      }
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          alert("Order Placed")
        }
      })
    }

  }
}
