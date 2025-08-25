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
menuType: String = 'default'
  constructor(private route :Router){}

  ngOnInit(): void{

    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.warn("in seller aRea");
          this.menuType ="seller"
        }else{
          console.warn("outSide Seller");
          this.menuType="default"
        }
      }
    })
  }


}
