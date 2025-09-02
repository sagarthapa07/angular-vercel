import { Component } from '@angular/core';
import { ProductsService } from '../../../core/sellerservice/products.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(private product: ProductsService){}

 ngOnInit():void{
  // this.product.popularProducts().subscribe((data)=>{
  //   console.warn(data);

  // })
}


 }
