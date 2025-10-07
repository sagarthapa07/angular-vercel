import { Component } from '@angular/core';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { order } from '../../../dataType';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  orderData: order[] | undefined

  constructor(private product: ProductsService) { }

  ngOnInit(): void {
this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    })
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result
    })
  }

}
