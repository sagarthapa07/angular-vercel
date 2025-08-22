import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { SellerAuthComponent } from './shared/components/seller-auth/seller-auth.component';
import { NgModel } from '@angular/forms';
import { SellerHomeComponent } from './shared/components/seller-home/seller-home.component';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [

    {
        path:'seller-auth',
        component:SellerAuthComponent
    },
    {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate: [authGuard]
    },
    





    {
        path:'',
        component:HomeComponent
    },
    

    
]