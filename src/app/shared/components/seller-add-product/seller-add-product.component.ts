import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
constructor(private http:HttpClient,private product:ProductsService){}

ngOnInit():void{

}
submit(data:Product){
  this.product.addProduct(data).subscribe((result)=>{
    console.warn(result);
  });
}
}
