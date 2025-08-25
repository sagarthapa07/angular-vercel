import { Component, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SellerService } from '../../../core/sellerservice/seller.service';
import { SignUp } from '../../../dataType';

@Component({
  selector: 'app-seller-auth',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin=false;
  authError:string = '';

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signup(data: SignUp): void {
    console.warn(data);
    this.seller.userSignup(data)
  }
  login(data: SignUp): void{
    this.authError="";
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is Not Correct";
      }
    })
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUP(){
    this.showLogin=false;
  }
}
