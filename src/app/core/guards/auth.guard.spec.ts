// import { TestBed } from '@angular/core/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SellerService } from '../sellerservice/seller.service';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockSellerService: any;

  beforeEach(() => {
    mockSellerService = {
      isSellerLoggedIn: of(true)  // or false to simulate unauthenticated
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: SellerService, useValue: mockSellerService }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if seller exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockSeller');

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    expect(guard.canActivate(route, state)).toBeTrue();
  });

  it('should return observable from sellerService if no seller in localStorage', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    if (result instanceof Observable) {
      result.subscribe(value => {
        expect(value).toBeTrue();
        done();
      });
    }
  });
});
