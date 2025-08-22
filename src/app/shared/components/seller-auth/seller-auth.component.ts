import { Component } from '@angular/core';
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

  ngOnInit(): void {}

  signup(data: SignUp): void {
    this.seller.userSignup(data)
  }
}

  // signup(data: SignUp): void {
  //   this.seller.userSignup(data).subscribe((result) => {
  //     if (result) {
  //       this.router.navigate(['seller-home']);
  //     }
  //   });
  // }