import { Component } from '@angular/core';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';
import { NgForOf } from '@angular/common';
import {FontAwesomeModule }from '@fortawesome/angular-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-seller-home',
  imports: [NgForOf, FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined | Product[]
  productMessage:undefined |string;
  icon=faTrash;  
  editIcon = faEdit
 constructor(private product:ProductsService){}



ngOnInit():void{
  this.list();
 }
deleteProduct(id:string){
  this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
      this.productMessage="Product is deleted";
      this.list();
    }
  })
  setTimeout(() => {
    this.productMessage=undefined
  }, 3000); 
}
list(){
    this.product.productList().subscribe((result)=>{
    console.warn(result);
    if(result){
      this.productList=result;
    }   
  })
}
}
