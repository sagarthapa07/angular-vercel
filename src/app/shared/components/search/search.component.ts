import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/sellerservice/products.service';
import { Product } from '../../../dataType';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: undefined |Product[]
  constructor(private activeRoute: ActivatedRoute, private product: ProductsService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const query = params.get('query');
      console.warn('Route param:', query);
      query && this.product.searchProducts(query).subscribe((result)=>{
        this.searchResult=result
      })
    });
  }
}