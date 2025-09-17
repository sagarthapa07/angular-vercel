import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ProductsService } from '../../core/sellerservice/products.service';
import { Product } from '../../dataType';
import { warn } from 'console';


@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = 'default'
  sellerName: string = ''
  searchResult: undefined | Product[];

  constructor(private route: Router, private product: ProductsService) { }

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn("in seller aRea");
          this.menuType = "seller"
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData && sellerData.name ? sellerData.name : '';
          }
        } else {
          // console.warn("outSide Seller");
          this.menuType = "default"
        }
      }
    })
  }
  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if(result.length>5){
          result.length= 5;
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult = undefined
  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }
  redirectToDetail(id:number){
    this.route.navigate(['/details/'+id])
  }
}
