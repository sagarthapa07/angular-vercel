import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
menuType: string = 'default'
sellerName:string = ''
  constructor(private route :Router){}

  ngOnInit(): void{

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.warn("in seller aRea");
          this.menuType ="seller"
          if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller');
            let sellerData=sellerStore && JSON.parse(sellerStore)[0]; 
            this.sellerName=sellerData.name;
          }
        }else{
          // console.warn("outSide Seller");
          this.menuType="default"
        }
      }
    })
  }
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/']);
  } 
}
