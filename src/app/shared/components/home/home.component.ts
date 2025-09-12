import { Component } from '@angular/core';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';
import { NgIf } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf } from '@angular/common';
import { warn } from 'node:console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgbCarouselModule, NgForOf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts:undefined | Product[]
  trendyProducts: undefined | Product[]
  constructor(private product: ProductsService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      // console.warn(data);
      this.popularProducts=data;
    })
    this.product.trendyProducts().subscribe((data)=>{
      // console.warn(data);
      this.trendyProducts=data;
    })
  }
}
