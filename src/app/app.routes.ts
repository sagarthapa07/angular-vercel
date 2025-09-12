import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { SellerAuthComponent } from './shared/components/seller-auth/seller-auth.component';

import { SellerHomeComponent } from './shared/components/seller-home/seller-home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SellerAddProductComponent } from './shared/components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './shared/components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './shared/components/search/search.component';


export const routes: Routes = [

    {
        path: 'seller-auth',
        component: SellerAuthComponent
    },
    {
        path: 'seller-home',
        component: SellerHomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'seller-add-product',
        component: SellerAddProductComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'seller-update-product/:id',
        component: SellerUpdateProductComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search/:query',
        component: SearchComponent,
    },








    {
        path: '',
        component: HomeComponent
    },



]