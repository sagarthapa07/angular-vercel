import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { SellerAuthComponent } from './shared/components/seller-auth/seller-auth.component';

import { SellerHomeComponent } from './shared/components/seller-home/seller-home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SellerAddProductComponent } from './shared/components/seller-add-product/seller-add-product.component';


export const routes: Routes = [

    {
        path:'seller-auth',
        component:SellerAuthComponent
    },
    {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'seller-add-product',
        component:SellerAddProductComponent,
        canActivate: [AuthGuard]
    },
    





    {
        path:'',
        component:HomeComponent
    },
    

    
]