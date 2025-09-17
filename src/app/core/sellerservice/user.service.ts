import { Injectable } from '@angular/core';
import { warn } from 'console';
import { SignUp } from '../../dataType';
import { HttpClient } from '@angular/common/http';
import { json } from 'stream/consumers';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignup(user:SignUp){
    this.http.post('http://localhost:3000/users',user,{observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }
}


