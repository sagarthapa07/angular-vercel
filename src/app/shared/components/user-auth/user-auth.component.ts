import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../../../dataType';
import { UserService } from '../../../core/sellerservice/user.service';


@Component({
  selector: 'app-user-auth',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor(private user:UserService){}
signUp(data:SignUp){
  console.warn(data);
  this.user.userSignup(data)
}
}
