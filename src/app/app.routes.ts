import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { NgModel } from '@angular/forms';

export const routes: Routes = [

    {
        path:'seller-auth',
        component:SellerAuthComponent
    },
        {
        path:'',
        component:HomeComponent
    },
];