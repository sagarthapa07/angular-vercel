import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../../dataType';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { log, warn } from 'console';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  


  constructor(private http: HttpClient, private router: Router) {}


  userSignup(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body)); //Local Stogare mai data ko dalte hai
        this.router.navigate(['seller-home']);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    console.warn(data);
    //Api call Code will be there

    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);

        if (result && result.body && result.body.length) {
          console.warn('user Logged in');
          localStorage.setItem('seller', JSON.stringify(result.body));       //Local Stogare mai data ko dalte hai
          this.router.navigate(['seller-home']);
        } else {
          console.warn('Login Failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
