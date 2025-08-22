import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SellerService } from '../sellerservice/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);

  return sellerService.isSellerLoggedIn;
};