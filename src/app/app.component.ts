import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { SellerService } from './core/sellerservice/seller.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-vercel';
  constructor(private seller:SellerService){}
  ngOnInit():void{
    this.seller.reloadSeller()
  }
}
