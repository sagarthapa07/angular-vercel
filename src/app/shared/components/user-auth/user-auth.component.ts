import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, SignUp } from '../../../dataType';
import { UserService } from '../../../core/sellerservice/user.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string =""
  constructor(private user: UserService) { }
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: SignUp) {
    console.warn(data);
    this.user.userSignup(data);
  }
  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn("apple",result);
      if(result){
        this.authError="Please enter vaild user detials"
      }
      
    })
  }
  openLogin() {
    this.showLogin = false
  }
  openSignup() {
    this.showLogin = true
  }
}
