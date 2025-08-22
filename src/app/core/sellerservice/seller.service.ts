import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../../dataType';
import { BehaviorSubject } from 'rxjs';
import { Router,RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn = new BehaviorSubject<boolean>(false)
constructor(private http:HttpClient, private router: Router ,) { }
  userSignup (data:SignUp) {
  this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}
  ).subscribe((result)=>{
    this.isSellerLoggedIn.next(true);
    this.router.navigate('./shared/components/seller-home/seller-home.component')
    console.warn("result",result);
  })
   
   return false
  }
}