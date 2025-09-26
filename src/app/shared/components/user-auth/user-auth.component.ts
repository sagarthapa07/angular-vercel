import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, SignUp } from '../../../dataType';
import { UserService } from '../../../core/sellerservice/user.service';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../core/sellerservice/products.service';



@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = ""
  constructor(private user: UserService, private product:ProductsService) { }
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    console.warn(data);
    this.user.userSignup(data);
  }
  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("apple", result);
      if (result) {
        this.authError = "Please enter vaild user detials"
      } else {
        this.localCartToRemoteCart()
      }

    })
  }
  openLogin() {
    this.showLogin = false
  }
  openSignup() {
    this.showLogin = true
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    console.warn(data);
    if (data) {
      let cartDataList: Product[] = JSON.parse(data)
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      cartDataList.forEach((product: Product,index: number) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(()=>{
                  this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("Item Stored in DB");
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart');
        }
        },5000)
      });
    }
  }
}
